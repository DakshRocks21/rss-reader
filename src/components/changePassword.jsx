//Puru Wrote This

import { useState } from "react";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { logoutSession } from "@/lib/session";// To logout users

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");// Sets inital state for old password, new password and confirm password as well as the message displayed
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const changePassword = async () => {
    setPasswordMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {// Checks if any field in empty in the input
        setPasswordMessage("All fields are required.");
        return;
    }
    if (newPassword !== confirmPassword) {// Checks if new password and confirm password are matching
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
        const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);// Checks if user entered correct old password
        await reauthenticateWithCredential(currentUser, credential);// Authenticates user

        await updatePassword(currentUser, newPassword);//Updates new password in firebase
        setPasswordMessage("Password has been successfully reset!");
        await logoutSession();// Log user out
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
        {/* Input for old password */}
        <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border border-gray-300 text-black p-2 rounded"
        />
        {/* Input for new password */}
        <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 text-black p-2 rounded"
        />
        {/* Input for confirm password  */}
        <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 text-black p-2 rounded"
        />
        {/* Button that resents password */}
        <button
            onClick={changePassword}
            disabled={isLoading}
            className={`p-2 rounded text-white ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
            {isLoading ? "Processing..." : "Reset Password"}
        </button>
        {/*Displays password message as needed to user */}
        {passwordMessage && <p className="text-red-500">{passwordMessage}</p>}
        </div>
    </div>
    );
    }
