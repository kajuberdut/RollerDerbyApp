import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL_SCRIPTS = os.environ.get("DATABASE_URL_SCRIPTS")


def connect_and_execute(db_url, sql_command):
    """Connect to the database, execute a SQL command, and disconnect."""
    conn = None
    try:
        # Connect to the database
        conn = psycopg2.connect(db_url)
        cursor = conn.cursor()

        # Execute the SQL command passed to the function
        cursor.execute(sql_command)
        
        # Commit changes to the database
        conn.commit()
        print("Command executed successfully.")

    except Exception as e:
        print(f"Failed to execute command: {e}")
        # Rollback in case there is any error
        if conn is not None:
            conn.rollback()

    finally:
        # Make sure the connection is closed
        if conn is not None:
            cursor.close()
            conn.close()
            print("Database connection closed.")


def delete_invites(team_id, db_url):
    """
    Args:
     username: The username of the user to delete.
    """
    try:
    # Connect to the ElephantSQL database
        
        # ! Note: "user" needs to be in double quotes and username needs to be in single quotes 

        sql_command = f"""
            DELETE FROM team_invite
            WHERE team_id = '{team_id}';
        """
        
        connect_and_execute(db_url, sql_command)


    except Exception as e:
        print(f"Error deleting invites from team_invites: {e}")
        
def delete_users_from_user_group(group_id, db_url):
    """
    Args:
     username: The username of the user to delete.
    """
    try:
    # Connect to the ElephantSQL database
        
        # ! Note: "user" needs to be in double quotes and username needs to be in single quotes 

        sql_command = f"""
            DELETE FROM user_group
            WHERE group_id = '{group_id}';
        """
        
        connect_and_execute(db_url, sql_command)


    except Exception as e:
        print(f"Error deleting users from user_group: {e}")

def delete_group(group_id, db_url):
    """
    Args:
     username: The username of the user to delete.
    """
    try:
    # Connect to the ElephantSQL database
        
        # ! Note: "user" needs to be in double quotes and username needs to be in single quotes 
        sql_command = f"""DELETE FROM "group" WHERE group_id = '{group_id}';"""
        
        connect_and_execute(db_url, sql_command)


    except Exception as e:
        print(f"Error deleting group: {e}")      


# Run commands to delete specific user 

group_id = 

delete_users_from_user_group(f"{group_id}", DATABASE_URL_SCRIPTS)
delete_invites(f"{group_id}", DATABASE_URL_SCRIPTS)
delete_group(f"{group_id}", DATABASE_URL_SCRIPTS)




# Open your terminal or command prompt go into scrips and run following.
# Run the following command

# python your_script_name.py

if __name__ == "__main__":
    # Retrieve database URL from environment variables
    db_url = os.environ.get("DATABASE_URL", "Your default DB URL here")