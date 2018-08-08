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
