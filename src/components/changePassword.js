//Puru Wrote This
import { useState } from "react";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { logoutSession } from "@/lib/session";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const changePassword = async () => {
    setPasswordMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
        setPasswordMessage("All fields are required.");
        return;
    }
    if (newPassword !== confirmPassword) {
        setPasswordMessage("New password are not matching!");
        return;
    }
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
        setPasswordMessage("User is not authenticated!");
        return;
    }

    try {
        setIsLoading(true);
        const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);
        await reauthenticateWithCredential(currentUser, credential);

        await updatePassword(currentUser, newPassword);
        setPasswordMessage("Password has been successfully reset!");
        await logoutSession();
        window.location.href = "/login";
    } catch (error) {
        console.error("Error resetting password:", error);
        setPasswordMessage("Failed to reset password");
    } finally {
        setIsLoading(false);
    }
    };

    return (
    <div className="mt-5">

        <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-3">
        <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border border-gray-300 text-black p-2 rounded"
        />
        <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 text-black p-2 rounded"
        />
        <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 text-black p-2 rounded"
        />
        <button
            onClick={changePassword}
            disabled={isLoading}
            className={`p-2 rounded text-white ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
            {isLoading ? "Processing..." : "Reset Password"}
        </button>
        {passwordMessage && <p className="text-red-500">{passwordMessage}</p>}
        </div>
    </div>
    );
    }
