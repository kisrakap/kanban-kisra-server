# kanban-kisra-server


**Kanban**
----
 > This app use for manage your task
* **URL**

 /tasks

* **Method:**

  `GET`

* **Request Header**
    ```json
    {
      "access_token": "<your access token>"
    }
    ```
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    ```json
    {
    "task": [
        {
          "id": 1,
          "title": "nonton",
          "detail": "haiiii",
          "category": "done",
          "UserId": 1,
          "createdAt": "2020-08-13T12:52:56.288Z",
          "updatedAt": "2020-08-13T12:52:56.288Z"
        },
        {
          "id": 2,
          "title": "nonton",
          "detail": "haiiii",
          "category": "done",
          "UserId": 1,
          "createdAt": "2020-08-13T12:52:58.175Z",
          "updatedAt": "2020-08-13T12:52:58.175Z"
        }
      ]
    }
    ```

* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ "errors": ["invalid token"] }`

    OR

  * **Code:** 401 <br />
    **Content:** `{ "errors": [ "Token not found" ]}`
 

****

* **URL**

 /tasks

* **Method:**

  `POST`

* **Request Header**

    __
    ```{
      "access_token": "<your access token>"
    }
    ```

* **Data Params**

  **Required:**

  `title:[string]`
  `detail:[string]`
  `category:[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
        "data": {
        "id": 8,
        "title": "nonton",
        "category": "done",
        "detail": "haiiii",
        "UserId": 1,
        "updatedAt": "2020-08-13T12:53:05.705Z",
        "createdAt": "2020-08-13T12:53:05.705Z"
      }
    }
    ```

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```json
    { "errors": ["Title must not empty", "Detail must not empty", "category must not empty" ]}
    ```
    OR

  * **Code:** 401 <br />
    **Content:** 
    ```json
    {"errors": ["Token not found"] }
    ```
    OR

  * **Code:** 401 <br />
    **Content:** 
    ```json
    {"errors": [ "invalid token"] }
    ```

********

* **URL**

 /tasks/:id

* **Method:**

  `DELETE`

* **Request Header**

    _Request Header_
    ```json
    {
      "access_token": "<your access token>"
    }
    ```


* **URL Params**

   **Required:**

   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** 
    ```json
    {"msg": "data with id: 8 is deleted"}
    ```

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```json
    { "errors" : ["Task not found"] }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:** 
    ```json
    { "errors" : ["invalid token"] }
    ```

    OR

  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "errors" : ["Token not found"] }
    ```

    OR

  * **Code:** 403 <br />
    **Content:** 
    ```json
    { "errors" : ["You're not authorize to do this"] }
    ```

    OR
  * **Code:** 500 <br />
    **Content:** 
    ```json
    {"errors": ["Internal Server Error"]}
    ```
    

********

* **URL**

 /tasks/:id

* **Method:**

  `PUT`

* **Request Header**

    ```json
    {
      "access_token": "<your access token>"
    }
    ```


*  **URL Params**

   **Required:**

    `id=[integer]`,
    `title: [string]`,
    `category : [string]`,

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
     ```json
    {"data": [ 1,
      [
        {
          "id": 1,
          "title": "makan",
          "detail": "todo",
          "category": "done",
          "UserId": 1,
          "createdAt": "2020-08-11T20:32:15.346Z",
          "updatedAt": "2020-08-11T20:35:21.471Z"
        }
      ]
    ]
    }
    ```

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```json
    { "errors" : ["Task not found"] }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:** 
    ```json
    { "errors" : ["invalid token"] }
    ```

    OR

  * **Code:** 401 <br />
    **Content:** 
    ```json
    { "errors" : ["Token not found"] }
    ```

    OR

  * **Code:** 403 <br />
    **Content:** 
    ```json
    { "errors" : ["You're not authorize to do this"] }
    ```

    OR
  * **Code:** 500 <br />
    **Content:** 
    ```json
    {"errors": ["Internal Server Error"]}
    ```
  
*****


* **URL**

 /register

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `email:[string]`
  `password:[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
      "id": 12,
      "email": "admin3@mail.com",
      "username": "admin3"
    }
    ```

* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {"errors": [
        "Username required",
        "Minimal 5 karakter",
        "Email required",
        "Password required"
      ]
    }
    ```
    OR

  * **Code:** 400 <br />
    **Content:** 
    ```json
    { "errors": [ "Email has been registered"] }
    ```
    OR

  * **Code:** 400 <br />
    **Content:** 
    ```json
    { "errors": [ "Username has been registered"] }
    ```
    OR

  * **Code:** 400 <br />
    **Content:** 
    ```json
      { "errors": 
        [
        "User.username cannot be null",
        "User.email cannot be null",
        "User.password cannot be null"
        ]
      }
      ```
    OR

  * **Code:** 500 <br />
    **Content:** 
    ```json
    { "errors" : "Internal Server Error" }
    ```
  
*****

* **URL**

  * /login

  * **Method:**

    `POST`

  * **Data Params**

    **Required:**

    `email:[string]`
    `password:[string]`

  * **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
    "id": 8,
    "username": "kisrakap",
    "email": "kisra@mail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJraXNyYWthcCIsImVtYWlsIjoia2lzcmFAbWFpbC5jb20iLCJpYXQiOjE1OTczNjIzODB9.ShaTQzPavVo8dqqCKKT_UFX5hTW8_OvU6U1r8sy5f7w"
    }
    ```

  * **Error Response:**

    * **Code:** 404 <br />
    * **Content:** 
    ```json
    {
      "errors": [
        "Error! Email & Password are Wrong"
      ]
    }
    ```

      OR

    * **Code:** 500 <br />
      **Content:** 
    ```json
    {"errors": ["Internal Server Error"]}
    ```

  
*****

* **URL**

  * /googlelogin

  * **Method:**

    `POST`

  * **Data Params**

    **Required:**

    `id_token:[string]`

  * **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
    "id": 8,
    "username": "Kisra Kapoh",
    "email": "kisrakap@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJraXNyYWthcCIsImVtYWlsIjoia2lzcmFAbWFpbC5jb20iLCJpYXQiOjE1OTczNjIzODB9.ShaTQzPavVo8dqqCKKT_UFX5hTW8_OvU6U1r8sy5f7w"
    }
    ```

  * **Error Response:**

    * **Code:** 500 <br />
      **Content:** 
    ```json
    {"errors": ["Internal Server Error"]}
    ```
    OR

  * **Error Response:**

      * **Code:** 400 <br />
        **Content:** 
      ```json
      {"errors": ["User.username cannot be null"]}
      ```
    
  * **Error Response:**

      * **Code:** 400 (jika Client ID nya beda)<br />
        **Content:** 
      ```json
      {"errors": ["Username has been registered"]}
      ```
    
