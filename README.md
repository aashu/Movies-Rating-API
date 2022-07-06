# Setup
1. set following environment variables.
    - TMDB_API_KEY : only needed if u r going to run script.js
    - TOKEN_KEY: for jwt
    - MONGO_CONNECTION_URL
2. run `yarn start`
# Docs

## Available Endpoints

### /register
#### parameters
method: POST
- email : required
- password : required
- first_name
- last_name

returns user details.

### /login
method: POST
- email: required
- password: required

returns jwt

## For authenticated users
Pass JWT token as `x-access-token` header or through `token` parameter in get request

## endpoints
### /movies/rate  

#### parameters
method: POST
- id: required
- rating: required

returns movie info with updated rating

### /movies/

#### parameters
method: GET

return list of all movies with all details.

### Open to all

### "/"

return movie names with their rating


# TODO
- [ ] Move docs to swagger ui
- [ ] Add basic frontend
- [x] Refactor controllers
- [ ] Write tests

