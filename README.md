For .env

NODE_ENV="development"
PORT='8888'
DATABASE_URL="postgresql://neondb_owner:npg_6fmGysY3wiQt@ep-wispy-poetry-a185eji3-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

In Postman, Header tabs put 2 roles 

=> key = x-role Value = admin
=> Key = x-user-id Value = cmh7pwtwa0002hpt0gfy94ift

API Path for test:

| Role        | Method     | Endpoint              | Description            |
| ----------- | ---------- | --------------------- | ---------------------- |
|  Admin | **GET**    | `/concerts`           | Get all concert             |
|  Admin | **POST**   | `/concerts/admin`     | Create new concert          |
|  Admin | **DELETE** | `/concerts/admin/:id` | Delete concert              |
|  Admin | **GET**    | `/reservations/admin` | Check History               |
|  User  | **POST**   | `/reservations`       | Reserved Concert            |
|  User  | **GET**    | `/reservations/me`    | Check reservation user      |
|  User  | **DELETE** | `/reservations/:id`   | Cancel reservation          |
|   -    | **GET**    | `/auth/me`            | Get me                      |
|   -    | **GET**    | `/switch/:target`     | switch user/admin           |
