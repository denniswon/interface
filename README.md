# Tally front-end coding challenge

Hi! Thanks for your interest in working at Tally. To start the technical interview process, we’ve put together this short front-end coding task. We expect this task to take about two hours.

We’re looking for a solution that is both correct and easy-to-read. We will focus on the logic: the API calls, pagination, and keeping track of state on the page.

We don’t expect you to handle errors or edge cases. Just focus on making sure that the happy path works correctly. We don’t expect you to spend time designing a fancy UI. We will not focus on the design.

## The problem

We would like to make an interface that lists the Compound accounts that are in danger of being liquidated.

Compound is an Ethereum lending protocol. Users lock some amount of one asset, like ETH, to borrow some amount of another one, like DAI.

For a given account, the value of the locked asset must exceed the value of the borrowed asset. If the prices change in the wrong direction, the account can be “unhealthy”, because the locked asset is no longer valuable enough to cover the borrowed asset. An unhealthy Compound account can be liquidated.

## Compound API

Compound provides an API to list accounts: https://compound.finance/docs/api#AccountService

Note that the `/accounts` documentation says that it accepts GETs, but does not mention that it also accepts POSTs. You may need to send more complicated queries as POSTs if they cannot be encoded in the query string!

## Requirements

Using the data from Compound’s API, your interface should show several things:
- The total number of accounts that are in danger of liquidation
- A list of the accounts that are in danger of liquidation
- For each account that is in danger of liquidation, show:
- Its address
- The amount of collateral
- The amount borrowed
- When the user reaches the end of the list of accounts, your interface should show that pagination is finished somehow
- Include some instructions on how to run the code

# NOTE This repo has been forked from the open-sourced Uniswap repository [Uniswap Interface](https://github.com/Uniswap/uniswap-interface)
because I liked there Tech Stack using Typescript, React, Styled Components. I was new to Redux, have been primarily using Zustand, but this
opportunity gave me quite a learning experience for Redux as well.
