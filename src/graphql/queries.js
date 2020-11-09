/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTweet = /* GraphQL */ `
  query GetTweet($id: ID!) {
    getTweet(id: $id) {
      id
      text
      user_id
      user {
        id
        name
        cognito_id
        confirmed
        color
        img_name
        tweet {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTweets = /* GraphQL */ `
  query ListTweets(
    $filter: ModelTweetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTweets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        user_id
        user {
          id
          name
          cognito_id
          confirmed
          color
          img_name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      cognito_id
      confirmed
      color
      img_name
      tweet {
        items {
          id
          text
          user_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        cognito_id
        confirmed
        color
        img_name
        tweet {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tweetsByUserId = /* GraphQL */ `
  query TweetsByUserId(
    $user_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelTweetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tweetsByUserId(
      user_id: $user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text
        user_id
        user {
          id
          name
          cognito_id
          confirmed
          color
          img_name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByCognitoId = /* GraphQL */ `
  query UserByCognitoId(
    $cognito_id: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByCognitoId(
      cognito_id: $cognito_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        cognito_id
        confirmed
        color
        img_name
        tweet {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
