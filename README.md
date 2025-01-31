# Alchemy NFT API - Demo
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
  ###### Check out the badges hosted by [shields.io](https://shields.io/)

 [Deployed Heroku Link](https://alchemy-nftapi-399720c6d6f7.herokuapp.com/)
  
  ## Description
  *A GUI demo-ing the capability of Alchemy's NFT API SDK and endpoints*

  ***

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Snippets](#snippets)
  - [Caveat](#caveat)
  - [Tech Stack](#technologies)
  - [License](#license)
  - [Author](#author)

  ***

  ## Installation

  ***This project is hosted on a heroku eco-dyno, when it is not being actively used it requires a bit extra start up time. This can be mitigated by upgrading to the next tier on heroku.***
  
  [Deployed Heroku Link](https://alchemy-nftapi-399720c6d6f7.herokuapp.com/)
  
  If you would like to host a version of it yourself, please follow these instructions:

  > to install both the client and server side dependencies: `npm i`

  > start the server: `npm start`

  > to concurrently start server and client react code w/ hotreload: `npm run develop`

  ***if you are indeed hosting your own version, please ensure that there is a `.env` file with your Alchemy API Key set up correctly in your project!***

  > **If you would like to host a heroku version of it privately**, make sure you have heroku CLI installed, and at the root of the project run `heroku create app_name`. After we confirmed that it has been deployed. Navigate to your heroku project page and ensure that all of your env var is set.
  >
  > ![envvar](/client/src/assets/envvar.png)

  ***

  ## Usage

  To query blockchain data using the Alchemy NFT API / SDK requires the follow params:
 
  *You are also able to connect your browser extension wallets that utilizes the [EIPS-6963](https://eips.ethereum.org/EIPS/eip-6963) which helps avoid conflict and improves user experience. See [Snippets](#snippets) for code sample*
  > ![gif0](/client/src/assets/connect.gif)

  > **All NFTs owned on multiple Networks `/api/nft/wallet/:net/:address/(page)`**
  > *`alchemy.nft.getNFTsForOwner()`*
  > - *wallet address*
  > - *pageKey (optional)*
  > - *optional config* (excludeFilters: [NftFilters.SPAM], pageSize: 30)
  >
  > In addition to Alchemy's own spam filters (available in higher tiers), I also filtered out any NFTs with malformed nft image links, along with any that include `stolen` or `spam` in their description.
  >
  > ![gif1](/client/src/assets/tour.gif)

  > **All NFTs from a Contract on specific Network `/api/nft/collection/:net/:address`**
  > *`alchemy.nft.getNftsForContract`*
  > - *network*
  > - *collection address*
  > - *pageKey (optional)*
  > - *optional config* (excludeFilters: [NftFilters.SPAM], pageSize: 30)
  >
  > ![gif2](/client/src/assets/page.gif)

  > **Singular NFT from a Contract on specific Network `/api/nft/:net/:id/:address`**
  > *`alchemy.nft.getNftMetadata()`*
  > - *network*
  > - *collection address*
  > - *token Id*
  >
  > ![gif3](/client/src/assets/NFT.gif)

  ***

  ## Snippets

  ### EIPS-6963
  Within the project, I had set up a useEffect that runs only when mounted to check for available wallet provider from the browser, and update the `Providers` state: 

  > ![Snippet1](https://res.cloudinary.com/dbjhly3lm/image/upload/v1714762245/samples/code%20snippet%20and%20screenshots/snippet1_b6revc.png)

  then another useEffect hook was used to conditionally display the `connect` button based on the availability of the providers state.

  ### serachParam Context / Provider
  To initiate a search, a serachParam Provider was created to handle primary search parameters like addresses / ids, and optional paramters such as pagination keys or spam toggles. This ensures all level of components would have ability to access and refresh our search parameters to initiate a new search:

  #### Provider Setup
  >![Snippet2](https://res.cloudinary.com/dbjhly3lm/image/upload/v1714762984/samples/code%20snippet%20and%20screenshots/Screen_Shot_2024-05-03_at_2.59.33_PM_ul6ql5.png)

  #### Provider Usage Example - Pagination
  >![Snippet3](https://res.cloudinary.com/dbjhly3lm/image/upload/v1714763852/samples/code%20snippet%20and%20screenshots/Screen_Shot_2024-05-03_at_3.17.17_PM_vevn1o.png)

  ### Express REST api end points + Alchemy API
  A useEffect is created to fetch our express server endpoints to utilize Alchemy's NFT Endpoint everytime our searchParam is updated:

  #### client side call
  >![Snippet4](https://res.cloudinary.com/dbjhly3lm/image/upload/v1714764759/samples/code%20snippet%20and%20screenshots/Screen_Shot_2024-05-03_at_3.31.41_PM_qfasfw.png)

  #### server side api
  >![Snippet5](https://res.cloudinary.com/dbjhly3lm/image/upload/v1714764780/samples/code%20snippet%20and%20screenshots/Screen_Shot_2024-05-03_at_3.32.20_PM_lc0pic.png)

  ## Caveat
  ### Additional Spam Filtering
  You might notice there might be a discrepency on the toal count # vs the actual returned item. I had filtered the response to ensure there are no malformed or NFTs that were clearly spams on top of Alchemy's own spam filter.
  >![Snippet6](https://res.cloudinary.com/dbjhly3lm/image/upload/v1714765004/samples/code%20snippet%20and%20screenshots/Screen_Shot_2024-05-03_at_3.34.59_PM_cjgusw.png)

  ***
  ## License

  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ***
  ## Author
  *Mari Ma*

  [<img src="https://res.cloudinary.com/dbjhly3lm/image/upload//h_50/v1682488301/personal%20assets/logo_github_icon_143196_phgakv.png" alt='github' >](https://github.com/DraconMarius)
  [<img src="https://res.cloudinary.com/dbjhly3lm/image/upload/h_50/v1682488301/personal%20assets/logo_linkedin_icon_143191_nv9tim.png" alt='linkedin'>](https://www.linkedin.com/in/mari-ma-70771585/)

[Icon credit @ Anton Kalashnyk](https://icon-icons.com/users/14quJ7FM9cYdQZHidnZoM/icon-sets/)

  ***
  ## Questions
  For any questions, please reach out directly or by creating an issue.


  