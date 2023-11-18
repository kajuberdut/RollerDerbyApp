import requests

print("***Geting a user:***")

getUser = requests.get("http://127.0.0.1:8000/users/me")

print(getUser)
print(getUser.text)
print(getUser.status_code)


print("***Geting a bout:***")

getBout = requests.get("http://127.0.0.1:8000/bouts/fake_bout")

print(getBout)
print(getBout.text)
print(getBout.status_code)
