import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type GuildMembersQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type GuildMembersQuery = { __typename?: 'Query' } & {
  guildMembers: Array<
    { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id' | 'role'> & {
        user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'fullName' | 'image'>;
        positions: Array<
          { __typename?: 'GuildPosition' } & Pick<Types.GuildPosition, 'id' | 'kind'> & {
              clan?: Types.Maybe<{ __typename?: 'Clan' } & Pick<Types.Clan, 'id' | 'name'>>;
            }
        >;
      }
  >;
};

export type GuildMembersIdsQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type GuildMembersIdsQuery = { __typename?: 'Query' } & {
  guildMembers: Array<
    { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id'> & {
        user: { __typename?: 'User' } & Pick<Types.User, 'id'>;
      }
  >;
};

export type CreateGuildMemberMutationVariables = Types.Exact<{
  data: Types.CreateGuildMemberInput;
}>;

export type CreateGuildMemberMutation = { __typename?: 'Mutation' } & {
  createGuildMember: { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id'>;
};

export type UpdateGuildMemberMutationVariables = Types.Exact<{
  data: Types.UpdateGuildMemberInput;
}>;

export type UpdateGuildMemberMutation = { __typename?: 'Mutation' } & {
  updateGuildMember: { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id'>;
};

export type DeleteGuildMemberMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  guildId: Types.Scalars['ID'];
}>;

export type DeleteGuildMemberMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteGuildMember'>;

export const GuildMembersDocument = gql`
  query guildMembers($guildId: ID!) {
    guildMembers(guildId: $guildId) {
      id
      role
      user {
        id
        fullName
        image
      }
      positions(active: true) {
        id
        kind
        clan {
          id
          name
        }
      }
    }
  }
`;

/**
 * __useGuildMembersQuery__
 *
 * To run a query within a React component, call `useGuildMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildMembersQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildMembersQuery(
  baseOptions?: Apollo.QueryHookOptions<GuildMembersQuery, GuildMembersQueryVariables>,
) {
  return Apollo.useQuery<GuildMembersQuery, GuildMembersQueryVariables>(GuildMembersDocument, baseOptions);
}
export function useGuildMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GuildMembersQuery, GuildMembersQueryVariables>,
) {
  return Apollo.useLazyQuery<GuildMembersQuery, GuildMembersQueryVariables>(GuildMembersDocument, baseOptions);
}
export type GuildMembersQueryHookResult = ReturnType<typeof useGuildMembersQuery>;
export type GuildMembersLazyQueryHookResult = ReturnType<typeof useGuildMembersLazyQuery>;
export type GuildMembersQueryResult = Apollo.QueryResult<GuildMembersQuery, GuildMembersQueryVariables>;
export const GuildMembersIdsDocument = gql`
  query guildMembersIds($guildId: ID!) {
    guildMembers(guildId: $guildId) {
      id
      user {
        id
      }
    }
  }
`;

/**
 * __useGuildMembersIdsQuery__
 *
 * To run a query within a React component, call `useGuildMembersIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildMembersIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildMembersIdsQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildMembersIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>,
) {
  return Apollo.useQuery<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>(GuildMembersIdsDocument, baseOptions);
}
export function useGuildMembersIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>,
) {
  return Apollo.useLazyQuery<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>(GuildMembersIdsDocument, baseOptions);
}
export type GuildMembersIdsQueryHookResult = ReturnType<typeof useGuildMembersIdsQuery>;
export type GuildMembersIdsLazyQueryHookResult = ReturnType<typeof useGuildMembersIdsLazyQuery>;
export type GuildMembersIdsQueryResult = Apollo.QueryResult<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>;
export const CreateGuildMemberDocument = gql`
  mutation createGuildMember($data: CreateGuildMemberInput!) {
    createGuildMember(data: $data) {
      id
    }
  }
`;
export type CreateGuildMemberMutationFn = Apollo.MutationFunction<
  CreateGuildMemberMutation,
  CreateGuildMemberMutationVariables
>;

/**
 * __useCreateGuildMemberMutation__
 *
 * To run a mutation, you first call `useCreateGuildMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuildMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuildMemberMutation, { data, loading, error }] = useCreateGuildMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGuildMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateGuildMemberMutation, CreateGuildMemberMutationVariables>,
) {
  return Apollo.useMutation<CreateGuildMemberMutation, CreateGuildMemberMutationVariables>(
    CreateGuildMemberDocument,
    baseOptions,
  );
}
export type CreateGuildMemberMutationHookResult = ReturnType<typeof useCreateGuildMemberMutation>;
export type CreateGuildMemberMutationResult = Apollo.MutationResult<CreateGuildMemberMutation>;
export type CreateGuildMemberMutationOptions = Apollo.BaseMutationOptions<
  CreateGuildMemberMutation,
  CreateGuildMemberMutationVariables
>;
export const UpdateGuildMemberDocument = gql`
  mutation updateGuildMember($data: UpdateGuildMemberInput!) {
    updateGuildMember(data: $data) {
      id
    }
  }
`;
export type UpdateGuildMemberMutationFn = Apollo.MutationFunction<
  UpdateGuildMemberMutation,
  UpdateGuildMemberMutationVariables
>;

/**
 * __useUpdateGuildMemberMutation__
 *
 * To run a mutation, you first call `useUpdateGuildMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGuildMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGuildMemberMutation, { data, loading, error }] = useUpdateGuildMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateGuildMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateGuildMemberMutation, UpdateGuildMemberMutationVariables>,
) {
  return Apollo.useMutation<UpdateGuildMemberMutation, UpdateGuildMemberMutationVariables>(
    UpdateGuildMemberDocument,
    baseOptions,
  );
}
export type UpdateGuildMemberMutationHookResult = ReturnType<typeof useUpdateGuildMemberMutation>;
export type UpdateGuildMemberMutationResult = Apollo.MutationResult<UpdateGuildMemberMutation>;
export type UpdateGuildMemberMutationOptions = Apollo.BaseMutationOptions<
  UpdateGuildMemberMutation,
  UpdateGuildMemberMutationVariables
>;
export const DeleteGuildMemberDocument = gql`
  mutation deleteGuildMember($id: ID!, $guildId: ID!) {
    deleteGuildMember(id: $id, guildId: $guildId)
  }
`;
export type DeleteGuildMemberMutationFn = Apollo.MutationFunction<
  DeleteGuildMemberMutation,
  DeleteGuildMemberMutationVariables
>;

/**
 * __useDeleteGuildMemberMutation__
 *
 * To run a mutation, you first call `useDeleteGuildMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGuildMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGuildMemberMutation, { data, loading, error }] = useDeleteGuildMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useDeleteGuildMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteGuildMemberMutation, DeleteGuildMemberMutationVariables>,
) {
  return Apollo.useMutation<DeleteGuildMemberMutation, DeleteGuildMemberMutationVariables>(
    DeleteGuildMemberDocument,
    baseOptions,
  );
}
export type DeleteGuildMemberMutationHookResult = ReturnType<typeof useDeleteGuildMemberMutation>;
export type DeleteGuildMemberMutationResult = Apollo.MutationResult<DeleteGuildMemberMutation>;
export type DeleteGuildMemberMutationOptions = Apollo.BaseMutationOptions<
  DeleteGuildMemberMutation,
  DeleteGuildMemberMutationVariables
>;