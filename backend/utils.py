import models, schemas, database, auth_token


def create_inbox_for_new_user(user):
    new_inbox = models.Post(owner=user)
    return new_inbox
