import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type ChaptersQueryVariables = Types.Exact<{
  squadId: Types.Scalars['ID'];
}>;

export type ChaptersQuery = { __typename?: 'Query' } & {
  chapters: Array<
    { __typename?: 'Chapter' } & Pick<Types.Chapter, 'id' | 'name' | 'email' | 'description'> & {
        positions: Array<
          { __typename?: 'SquadPosition' } & Pick<Types.SquadPosition, 'id' | 'from' | 'to' | 'notes'> & {
              position: { __typename?: 'Position' } & Pick<Types.Position, 'id' | 'name' | 'description'>;
              member: { __typename?: 'SquadMember' } & Pick<Types.SquadMember, 'id'> & {
                  user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'fullName' | 'image'>;
                };
            }
        >;
      }
  >;
};

export type CreateChapterMutationVariables = Types.Exact<{
  data: Types.CreateChapterInput;
}>;

export type CreateChapterMutation = { __typename?: 'Mutation' } & {
  createChapter: { __typename?: 'Chapter' } & Pick<Types.Chapter, 'id'>;
};

export type UpdateChapterMutationVariables = Types.Exact<{
  data: Types.UpdateChapterInput;
}>;

export type UpdateChapterMutation = { __typename?: 'Mutation' } & {
  updateChapter: { __typename?: 'Chapter' } & Pick<Types.Chapter, 'id'>;
};

export type DeleteChapterMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  squadId: Types.Scalars['ID'];
}>;

export type DeleteChapterMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteChapter'>;

export const ChaptersDocument = gql`
  query chapters($squadId: ID!) {
    chapters(squadId: $squadId) {
      id
      name
      email
      description
      positions(active: true) {
        id
        from
        to
        notes
        position {
          id
          name
          description
        }
        member {
          id
          user {
            id
            fullName
            image
          }
        }
      }
    }
  }
`;

/**
 * __useChaptersQuery__
 *
 * To run a query within a React component, call `useChaptersQuery` and pass it any options that fit your needs.
 * When your component renders, `useChaptersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChaptersQuery({
 *   variables: {
 *      squadId: // value for 'squadId'
 *   },
 * });
 */
export function useChaptersQuery(baseOptions?: Apollo.QueryHookOptions<ChaptersQuery, ChaptersQueryVariables>) {
  return Apollo.useQuery<ChaptersQuery, ChaptersQueryVariables>(ChaptersDocument, baseOptions);
}
export function useChaptersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChaptersQuery, ChaptersQueryVariables>) {
  return Apollo.useLazyQuery<ChaptersQuery, ChaptersQueryVariables>(ChaptersDocument, baseOptions);
}
export type ChaptersQueryHookResult = ReturnType<typeof useChaptersQuery>;
export type ChaptersLazyQueryHookResult = ReturnType<typeof useChaptersLazyQuery>;
export type ChaptersQueryResult = Apollo.QueryResult<ChaptersQuery, ChaptersQueryVariables>;
export const CreateChapterDocument = gql`
  mutation createChapter($data: CreateChapterInput!) {
    createChapter(data: $data) {
      id
    }
  }
`;
export type CreateChapterMutationFn = Apollo.MutationFunction<CreateChapterMutation, CreateChapterMutationVariables>;

/**
 * __useCreateChapterMutation__
 *
 * To run a mutation, you first call `useCreateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChapterMutation, { data, loading, error }] = useCreateChapterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateChapterMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateChapterMutation, CreateChapterMutationVariables>,
) {
  return Apollo.useMutation<CreateChapterMutation, CreateChapterMutationVariables>(CreateChapterDocument, baseOptions);
}
export type CreateChapterMutationHookResult = ReturnType<typeof useCreateChapterMutation>;
export type CreateChapterMutationResult = Apollo.MutationResult<CreateChapterMutation>;
export type CreateChapterMutationOptions = Apollo.BaseMutationOptions<
  CreateChapterMutation,
  CreateChapterMutationVariables
>;
export const UpdateChapterDocument = gql`
  mutation updateChapter($data: UpdateChapterInput!) {
    updateChapter(data: $data) {
      id
    }
  }
`;
export type UpdateChapterMutationFn = Apollo.MutationFunction<UpdateChapterMutation, UpdateChapterMutationVariables>;

/**
 * __useUpdateChapterMutation__
 *
 * To run a mutation, you first call `useUpdateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChapterMutation, { data, loading, error }] = useUpdateChapterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateChapterMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateChapterMutation, UpdateChapterMutationVariables>,
) {
  return Apollo.useMutation<UpdateChapterMutation, UpdateChapterMutationVariables>(UpdateChapterDocument, baseOptions);
}
export type UpdateChapterMutationHookResult = ReturnType<typeof useUpdateChapterMutation>;
export type UpdateChapterMutationResult = Apollo.MutationResult<UpdateChapterMutation>;
export type UpdateChapterMutationOptions = Apollo.BaseMutationOptions<
  UpdateChapterMutation,
  UpdateChapterMutationVariables
>;
export const DeleteChapterDocument = gql`
  mutation deleteChapter($id: ID!, $squadId: ID!) {
    deleteChapter(id: $id, squadId: $squadId)
  }
`;
export type DeleteChapterMutationFn = Apollo.MutationFunction<DeleteChapterMutation, DeleteChapterMutationVariables>;

/**
 * __useDeleteChapterMutation__
 *
 * To run a mutation, you first call `useDeleteChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChapterMutation, { data, loading, error }] = useDeleteChapterMutation({
 *   variables: {
 *      id: // value for 'id'
 *      squadId: // value for 'squadId'
 *   },
 * });
 */
export function useDeleteChapterMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteChapterMutation, DeleteChapterMutationVariables>,
) {
  return Apollo.useMutation<DeleteChapterMutation, DeleteChapterMutationVariables>(DeleteChapterDocument, baseOptions);
}
export type DeleteChapterMutationHookResult = ReturnType<typeof useDeleteChapterMutation>;
export type DeleteChapterMutationResult = Apollo.MutationResult<DeleteChapterMutation>;
export type DeleteChapterMutationOptions = Apollo.BaseMutationOptions<
  DeleteChapterMutation,
  DeleteChapterMutationVariables
>;