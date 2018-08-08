# GithubSearch

  A basic webpage built using the MEAN stack to search for GitHub users in Bangalore  
  Made as a technical assessment for Percept Labs Private Limited  

## Installation:  

  Download [Node.Js version 8.11.3 LTS](https://nodejs.org/en/)  

  Clone the repository   
  ```
  git clone https://github.com/JonathanWu1/GithubSearch.git
  ```

  ### Windows:  
  In the command prompt type:  
  ```
  cd /path/to/the/folder
  npm install
  npm start
  ```

  ### Usage
  In the browser go to the URL [http://localhost:3000/](http://localhost:3000)  
  the '/' route handles all the requests, no other routes are supported  
  The dropdown allows the user to control the number of search results shown per page  
  Clicking anywhere around the profile image or the profile name will show more details about the user on the right  
  Clicking on the GitHub link will redirect the user to the official GitHub page  

  ### No MongoDB Integration
  I decided not to use MongoDB for this assessment because GitHub's API provides more than enough search results for the search feature   to allow for most users to find what they need.  
  The rate limit of 60 requests per hour is more than enough for anyone who is not testing/debugging the webpage (I only managed to hit this rate limit once during my testing period which I did in order to handle the GIT hub rate limit error)  
  

  ### GitHub search API  

  #### Rate Limit  
  Due to GitHub's [rate limit](https://developer.github.com/v3/search/#rate-limit) for unauthorized requests, and their upper limit of 100 users on their GET /search/users route the page can return a maximum of 1000 results for a search term.  
  For example:  
    https://api.github.com/search/users?q=Jonathan+in:login+location:bangalore  
    This will return the first 1000 users who have set their location to Bangalore and have 'Jonathan' in their login name  

  #### Empty String  
  A query without a search string will return all users who fit the criteria of the other parameters  
  For example:  
    https://api.github.com/search/users?q=+in:login+location:bangalore  
    This will return the first 1000 users who have set their location to Bangalore  

  #### Pagination  
  The GitHub search api provides pagination in the request URL  
    https://api.github.com/search/users?q=+in:login+location:bangalore&per_page=100&page=1  
    The per_page parameter specifies the number of items per per_page  
    The page parameter specifies the page number

  #### User details
  The GET /search/users route does not return all of the information related to the users  
  In order to get all the user data provided by GitHub you need to use the GET /users/username route

  
