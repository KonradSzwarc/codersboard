import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type SquadMembersQueryVariables = Types.Exact<{
  squadId: Types.Scalars['ID'];
  archived?: Types.Maybe<Types.Scalars['Boolean']>;
}>;

export type SquadMembersQuery = {
  squadMembers: (Pick<Types.SquadMember, 'id' | 'role' | 'deletedAt'> & {
    user: Pick<Types.User, 'id' | 'fullName' | 'image'>;
    activePositions: (Pick<Types.SquadPosition, 'id'> & {
      position: Pick<Types.Position, 'id' | 'name'>;
      chapter?: Types.Maybe<Pick<Types.Chapter, 'id' | 'name'>>;
    })[];
    pastPositions: Pick<Types.SquadPosition, 'id'>[];
  })[];
};

export type SquadMembersIdsQueryVariables = Types.Exact<{
  squadId: Types.Scalars['ID'];
}>;

export type SquadMembersIdsQuery = {
  squadMembers: (Pick<Types.SquadMember, 'id'> & { user: Pick<Types.User, 'id'> })[];
};

export type CreateSquadMemberMutationVariables = Types.Exact<{
  data: Types.CreateSquadMemberInput;
}>;

export type CreateSquadMemberMutation = { createSquadMember: Pick<Types.SquadMember, 'id'> };

export type UpdateSquadMemberMutationVariables = Types.Exact<{
  data: Types.UpdateSquadMemberInput;
}>;

export type UpdateSquadMemberMutation = { updateSquadMember: Pick<Types.SquadMember, 'id'> };

export const SquadMembersDocument = gql`
  query squadMembers($squadId: ID!, $archived: Boolean) {
    squadMembers(squadId: $squadId, archived: $archived) {
      id
      role
      user {
        id
        fullName
        image
      }
      activePositions: positions(active: true) {
        id
        position {
          id
          name
        }
        chapter {
          id
          name
        }
      }
      pastPositions: positions(active: false) {
        id
      }
      deletedAt
    }
  }
`;

/**
 * __useSquadMembersQuery__
 *
 * To run a query within a React component, call `useSquadMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSquadMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSquadMembersQuery({
 *   variables: {
 *      squadId: // value for 'squadId'
 *      archived: // value for 'archived'
 *   },
 * });
 */
export function useSquadMembersQuery(
  baseOptions?: Apollo.QueryHookOptions<SquadMembersQuery, SquadMembersQueryVariables>,
) {
  return Apollo.useQuery<SquadMembersQuery, SquadMembersQueryVariables>(SquadMembersDocument, baseOptions);
}
export function useSquadMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SquadMembersQuery, SquadMembersQueryVariables>,
) {
  return Apollo.useLazyQuery<SquadMembersQuery, SquadMembersQueryVariables>(SquadMembersDocument, baseOptions);
}
export type SquadMembersQueryHookResult = ReturnType<typeof useSquadMembersQuery>;
export type SquadMembersLazyQueryHookResult = ReturnType<typeof useSquadMembersLazyQuery>;
export type SquadMembersQueryResult = Apollo.QueryResult<SquadMembersQuery, SquadMembersQueryVariables>;
export const SquadMembersIdsDocument = gql`
  query squadMembersIds($squadId: ID!) {
    squadMembers(squadId: $squadId) {
      id
      user {
        id
      }
    }
  }
`;

/**
 * __useSquadMembersIdsQuery__
 *
 * To run a query within a React component, call `useSquadMembersIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSquadMembersIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSquadMembersIdsQuery({
 *   variables: {
 *      squadId: // value for 'squadId'
 *   },
 * });
 */
export function useSquadMembersIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<SquadMembersIdsQuery, SquadMembersIdsQueryVariables>,
) {
  return Apollo.useQuery<SquadMembersIdsQuery, SquadMembersIdsQueryVariables>(SquadMembersIdsDocument, baseOptions);
}
export function useSquadMembersIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SquadMembersIdsQuery, SquadMembersIdsQueryVariables>,
) {
  return Apollo.useLazyQuery<SquadMembersIdsQuery, SquadMembersIdsQueryVariables>(SquadMembersIdsDocument, baseOptions);
}
export type SquadMembersIdsQueryHookResult = ReturnType<typeof useSquadMembersIdsQuery>;
export type SquadMembersIdsLazyQueryHookResult = ReturnType<typeof useSquadMembersIdsLazyQuery>;
export type SquadMembersIdsQueryResult = Apollo.QueryResult<SquadMembersIdsQuery, SquadMembersIdsQueryVariables>;
export const CreateSquadMemberDocument = gql`
  mutation createSquadMember($data: CreateSquadMemberInput!) {
    createSquadMember(data: $data) {
      id
    }
  }
`;
export type CreateSquadMemberMutationFn = Apollo.MutationFunction<
  CreateSquadMemberMutation,
  CreateSquadMemberMutationVariables
>;

/**
 * __useCreateSquadMemberMutation__
 *
 * To run a mutation, you first call `useCreateSquadMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSquadMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSquadMemberMutation, { data, loading, error }] = useCreateSquadMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSquadMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateSquadMemberMutation, CreateSquadMemberMutationVariables>,
) {
  return Apollo.useMutation<CreateSquadMemberMutation, CreateSquadMemberMutationVariables>(
    CreateSquadMemberDocument,
    baseOptions,
  );
}
export type CreateSquadMemberMutationHookResult = ReturnType<typeof useCreateSquadMemberMutation>;
export type CreateSquadMemberMutationResult = Apollo.MutationResult<CreateSquadMemberMutation>;
export type CreateSquadMemberMutationOptions = Apollo.BaseMutationOptions<
  CreateSquadMemberMutation,
  CreateSquadMemberMutationVariables
>;
export const UpdateSquadMemberDocument = gql`
  mutation updateSquadMember($data: UpdateSquadMemberInput!) {
    updateSquadMember(data: $data) {
      id
    }
  }
`;
export type UpdateSquadMemberMutationFn = Apollo.MutationFunction<
  UpdateSquadMemberMutation,
  UpdateSquadMemberMutationVariables
>;

/**
 * __useUpdateSquadMemberMutation__
 *
 * To run a mutation, you first call `useUpdateSquadMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSquadMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSquadMemberMutation, { data, loading, error }] = useUpdateSquadMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSquadMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateSquadMemberMutation, UpdateSquadMemberMutationVariables>,
) {
  return Apollo.useMutation<UpdateSquadMemberMutation, UpdateSquadMemberMutationVariables>(
    UpdateSquadMemberDocument,
    baseOptions,
  );
}
export type UpdateSquadMemberMutationHookResult = ReturnType<typeof useUpdateSquadMemberMutation>;
export type UpdateSquadMemberMutationResult = Apollo.MutationResult<UpdateSquadMemberMutation>;
export type UpdateSquadMemberMutationOptions = Apollo.BaseMutationOptions<
  UpdateSquadMemberMutation,
  UpdateSquadMemberMutationVariables
>;
