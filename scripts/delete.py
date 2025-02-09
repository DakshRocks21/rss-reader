"""

Written by Daksh

To clean up the DB and delete all users and firestore documents.
This allows you to start fresh with a clean slate.

"""

import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from firebase_admin import firestore

def delete_all_users_and_firestore(service_account_path):
    cred = credentials.Certificate(service_account_path)
    firebase_admin.initialize_app(cred)

    page = auth.list_users()
    while page:
        for user in page.users:
            try:
                auth.delete_user(user.uid)
                print(f"Deleted Auth user: {user.uid}")
            except Exception as e:
                print(f"Error deleting Auth user {user.uid}: {e}")
        page = page.get_next_page()

    db = firestore.client()
    docs = db.collection("users").stream()
    deleted_count = 0
    for doc in docs:
        try:
            doc.reference.delete()
            print(f"Deleted Firestore doc: {doc.id}")
            deleted_count += 1
        except Exception as e:
            print(f"Error deleting Firestore doc {doc.id}: {e}")

    print(f"Deletion complete. Total Auth users deleted, plus {deleted_count} Firestore documents from /users.")


SERVICE_ACCOUNT_FILE = "private.json"

delete = input("DEELETE ALL USERS AND FIRESTORE DOCUMENTS?")
if delete == "y":
    delete_all_users_and_firestore(SERVICE_ACCOUNT_FILE)
