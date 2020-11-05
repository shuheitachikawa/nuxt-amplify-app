/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTweet = /* GraphQL */ `
  query GetTweet($id: ID!) {
    getTweet(id: $id) {
      id
      user_id
      text
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
        user_id
        text
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($orderId: ID!, $status: Status!, $createdAt: AWSDateTime!) {
    getItem(orderId: $orderId, status: $status, createdAt: $createdAt) {
      orderId
      status
      createdAt
      name
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $orderId: ID
    $statusCreatedAt: ModelItemPrimaryCompositeKeyConditionInput
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItems(
      orderId: $orderId
      statusCreatedAt: $statusCreatedAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        orderId
        status
        createdAt
        name
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tweetsByUserId = /* GraphQL */ `
  query TweetsByUserId(
    $user_id: String
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
        user_id
        text
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const itemsByStatus = /* GraphQL */ `
  query ItemsByStatus(
    $status: Status
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    itemsByStatus(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        orderId
        status
        createdAt
        name
        updatedAt
      }
      nextToken
    }
  }
`;
