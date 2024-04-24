import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthDto = {
  __typename?: 'AuthDto';
  access_token: Scalars['String']['output'];
  user: UserEntity;
};

export type Class = {
  __typename?: 'Class';
  class_id: Scalars['String']['output'];
  class_type: Scalars['String']['output'];
  display_name: Scalars['String']['output'];
  lecturer: Lecturer;
  participating_student: Scalars['Int']['output'];
  points: Array<GroupedPoint>;
  program: Scalars['String']['output'];
  semester: Semester;
  subject: Subject;
  total_student: Scalars['Int']['output'];
};


export type ClassPointsArgs = {
  class_id?: InputMaybe<Scalars['String']['input']>;
  class_type?: InputMaybe<Scalars['String']['input']>;
  criteria_id?: InputMaybe<Scalars['String']['input']>;
  faculty_id?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  lecturer_id?: InputMaybe<Scalars['String']['input']>;
  program?: InputMaybe<Scalars['String']['input']>;
  semester_id?: InputMaybe<Scalars['String']['input']>;
  subjects?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Comment = {
  __typename?: 'Comment';
  class?: Maybe<Class>;
  comment_id: Scalars['String']['output'];
  display_name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CommentQuantity = {
  __typename?: 'CommentQuantity';
  quantity: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type Criteria = {
  __typename?: 'Criteria';
  criteria_id: Scalars['String']['output'];
  display_name: Scalars['String']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  semester: Array<Semester>;
  type: Array<CriteriaProperty>;
};

export type CriteriaProperty = {
  __typename?: 'CriteriaProperty';
  class_type: Scalars['String']['output'];
  num: Scalars['Int']['output'];
};

export type Faculty = {
  __typename?: 'Faculty';
  display_name: Scalars['String']['output'];
  faculty_id: Scalars['String']['output'];
  full_name?: Maybe<Scalars['String']['output']>;
  lecturers?: Maybe<PaginatedLecturer>;
  points?: Maybe<PaginatedGroupedPoint>;
  subjects?: Maybe<PaginatedSubject>;
  total_point?: Maybe<GroupedPoint>;
};


export type FacultyLecturersArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
};


export type FacultyPointsArgs = {
  class_id?: InputMaybe<Scalars['String']['input']>;
  class_type?: InputMaybe<Scalars['String']['input']>;
  criteria_id?: InputMaybe<Scalars['String']['input']>;
  faculty_id?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  lecturer_id?: InputMaybe<Scalars['String']['input']>;
  program?: InputMaybe<Scalars['String']['input']>;
  semester_id?: InputMaybe<Scalars['String']['input']>;
  subjects?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type FacultySubjectsArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
};


export type FacultyTotal_PointArgs = {
  class_id?: InputMaybe<Scalars['String']['input']>;
  class_type?: InputMaybe<Scalars['String']['input']>;
  criteria_id?: InputMaybe<Scalars['String']['input']>;
  faculty_id?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  lecturer_id?: InputMaybe<Scalars['String']['input']>;
  program?: InputMaybe<Scalars['String']['input']>;
  semester_id?: InputMaybe<Scalars['String']['input']>;
  subjects?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FilterArgs = {
  class_id?: InputMaybe<Scalars['String']['input']>;
  class_type?: InputMaybe<Scalars['String']['input']>;
  criteria_id?: InputMaybe<Scalars['String']['input']>;
  faculty_id?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  lecturer_id?: InputMaybe<Scalars['String']['input']>;
  program?: InputMaybe<Scalars['String']['input']>;
  semester_id?: InputMaybe<Scalars['String']['input']>;
  subjects?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GroupedPoint = {
  __typename?: 'GroupedPoint';
  average_point: Scalars['Float']['output'];
  class_num: Scalars['Int']['output'];
  display_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  max_point?: Maybe<Scalars['Float']['output']>;
  point?: Maybe<Scalars['Float']['output']>;
};

export type Lecturer = {
  __typename?: 'Lecturer';
  birth_date?: Maybe<Scalars['DateTime']['output']>;
  classes: PaginatedClass;
  display_name?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  faculty: Faculty;
  faculty_id?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Boolean']['output']>;
  learning?: Maybe<Scalars['String']['output']>;
  learning_position?: Maybe<Scalars['String']['output']>;
  lecturer_id: Scalars['String']['output'];
  mscb?: Maybe<Scalars['Int']['output']>;
  ngach?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  points: Array<GroupedPoint>;
  position?: Maybe<Scalars['String']['output']>;
  total_point?: Maybe<Scalars['Float']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};


export type LecturerClassesArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
};


export type LecturerPointsArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserEntity;
};


export type MutationRegisterArgs = {
  user: UserDto;
};

export type PaginatedClass = {
  __typename?: 'PaginatedClass';
  data: Array<Class>;
  meta: PaginatedMetaData;
};

export type PaginatedComment = {
  __typename?: 'PaginatedComment';
  data: Array<Comment>;
  meta: PaginatedMetaData;
};

export type PaginatedCriteria = {
  __typename?: 'PaginatedCriteria';
  data: Array<Criteria>;
  meta: PaginatedMetaData;
};

export type PaginatedFaculty = {
  __typename?: 'PaginatedFaculty';
  data: Array<Faculty>;
  meta: PaginatedMetaData;
};

export type PaginatedGroupedPoint = {
  __typename?: 'PaginatedGroupedPoint';
  data: Array<GroupedPoint>;
  meta: PaginatedMetaData;
};

export type PaginatedLecturer = {
  __typename?: 'PaginatedLecturer';
  data: Array<Lecturer>;
  meta: PaginatedMetaData;
};

export type PaginatedMetaData = {
  __typename?: 'PaginatedMetaData';
  hasNext: Scalars['Boolean']['output'];
  hasPrev: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  total_item: Scalars['Int']['output'];
  total_page: Scalars['Int']['output'];
};

export type PaginatedSubject = {
  __typename?: 'PaginatedSubject';
  data: Array<Subject>;
  meta: PaginatedMetaData;
};

export type PaginationArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type Program = {
  __typename?: 'Program';
  program: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** View particular class information */
  class?: Maybe<Class>;
  /** List all classes */
  classes: PaginatedClass;
  /** View particular comment information */
  comment?: Maybe<Comment>;
  commentQuantity: CommentQuantity;
  /** List all comments */
  comments: PaginatedComment;
  criteria?: Maybe<Criteria>;
  criterias: PaginatedCriteria;
  currentUser: UserEntity;
  /** List all faculty available */
  faculties: PaginatedFaculty;
  /** Get detail information of a faculty and its lecturer list */
  faculty?: Maybe<Faculty>;
  /** List all points, group by a specific entity */
  groupedPoints: PaginatedGroupedPoint;
  /** View detail information of a specific lecturer */
  lecturer?: Maybe<Lecturer>;
  /** List all lecturer */
  lecturers: PaginatedLecturer;
  login: AuthDto;
  programs: Array<Program>;
  /** List all semester */
  semesters?: Maybe<Array<Semester>>;
  subject?: Maybe<Subject>;
  subjects: PaginatedSubject;
};


export type QueryClassArgs = {
  id: Scalars['String']['input'];
};


export type QueryClassesArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
};


export type QueryCommentArgs = {
  id: Scalars['String']['input'];
};


export type QueryCommentQuantityArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommentsArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCriteriaArgs = {
  id: Scalars['String']['input'];
};


export type QueryCriteriasArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
};


export type QueryFacultiesArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
};


export type QueryFacultyArgs = {
  id: Scalars['String']['input'];
};


export type QueryGroupedPointsArgs = {
  class_id?: InputMaybe<Scalars['String']['input']>;
  class_type?: InputMaybe<Scalars['String']['input']>;
  criteria_id?: InputMaybe<Scalars['String']['input']>;
  faculty_id?: InputMaybe<Scalars['String']['input']>;
  groupEntity?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  lecturer_id?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  program?: InputMaybe<Scalars['String']['input']>;
  semester_id?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  subjects?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryLecturerArgs = {
  id: Scalars['String']['input'];
};


export type QueryLecturersArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
};


export type QueryLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QuerySubjectArgs = {
  id: Scalars['String']['input'];
};


export type QuerySubjectsArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
};

export type Semester = {
  __typename?: 'Semester';
  display_name: Scalars['String']['output'];
  semester_id: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type SortArgs = {
  isAscending?: InputMaybe<Scalars['Boolean']['input']>;
  sortField?: InputMaybe<SortFieldArgs>;
};

export type SortFieldArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  type?: Scalars['String']['input'];
};

export type Subject = {
  __typename?: 'Subject';
  display_name?: Maybe<Scalars['String']['output']>;
  faculty?: Maybe<Faculty>;
  faculty_id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Array<GroupedPoint>>;
  subject_id: Scalars['String']['output'];
  total_point?: Maybe<Scalars['Float']['output']>;
};


export type SubjectPointsArgs = {
  filter?: InputMaybe<FilterArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  sort?: InputMaybe<SortArgs>;
};

export type UserDto = {
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CommentQuantityQueryVariables = Exact<{
  filter?: InputMaybe<FilterArgs>;
}>;


export type CommentQuantityQuery = { __typename?: 'Query', positive: { __typename?: 'CommentQuantity', quantity: number, type: string }, negative: { __typename?: 'CommentQuantity', quantity: number, type: string }, all: { __typename?: 'CommentQuantity', quantity: number, type: string } };

export type CommentListQueryVariables = Exact<{
  filter?: InputMaybe<FilterArgs>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortArgs>;
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type CommentListQuery = { __typename?: 'Query', comments: { __typename?: 'PaginatedComment', data: Array<{ __typename?: 'Comment', comment_id: string, display_name: string, type: string, class?: { __typename?: 'Class', class_id: string, class_type: string, display_name: string, participating_student: number, program: string, total_student: number } | null }>, meta: { __typename?: 'PaginatedMetaData', hasNext: boolean, hasPrev: boolean, page: number, size: number, total_item: number, total_page: number } } };

export type CriteriasQueryVariables = Exact<{
  filter?: InputMaybe<FilterArgs>;
  isAscending?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CriteriasQuery = { __typename?: 'Query', criterias: { __typename?: 'PaginatedCriteria', data: Array<{ __typename?: 'Criteria', display_name: string, criteria_id: string }>, meta: { __typename?: 'PaginatedMetaData', hasNext: boolean, hasPrev: boolean, page: number, size: number, total_item: number, total_page: number } } };

export type OverallCriteriaPointsEachSemesterQueryVariables = Exact<{
  class_type?: InputMaybe<Scalars['String']['input']>;
  faculty_id?: InputMaybe<Scalars['String']['input']>;
  lecturer_id?: InputMaybe<Scalars['String']['input']>;
  program?: InputMaybe<Scalars['String']['input']>;
  subjects?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type OverallCriteriaPointsEachSemesterQuery = { __typename?: 'Query', groupedPoints: { __typename?: 'PaginatedGroupedPoint', data: Array<{ __typename?: 'GroupedPoint', average_point: number, class_num: number, display_name?: string | null, id: string, max_point?: number | null, point?: number | null }> } };

export type FacultiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FacultiesQuery = { __typename?: 'Query', faculties: { __typename?: 'PaginatedFaculty', data: Array<{ __typename?: 'Faculty', display_name: string, faculty_id: string, full_name?: string | null }> } };

export type LecturerstWithPointsQueryVariables = Exact<{
  filter?: InputMaybe<FilterArgs>;
  sort?: InputMaybe<SortArgs>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LecturerstWithPointsQuery = { __typename?: 'Query', lecturers: { __typename?: 'PaginatedLecturer', data: Array<{ __typename?: 'Lecturer', birth_date?: any | null, display_name?: string | null, email?: string | null, faculty_id?: string | null, gender?: boolean | null, learning?: string | null, learning_position?: string | null, lecturer_id: string, mscb?: number | null, ngach?: string | null, phone?: string | null, position?: string | null, total_point?: number | null, username?: string | null, faculty: { __typename?: 'Faculty', display_name: string, faculty_id: string, full_name?: string | null }, points: Array<{ __typename?: 'GroupedPoint', average_point: number, class_num: number, id: string, max_point?: number | null, point?: number | null, display_name?: string | null }> }>, meta: { __typename?: 'PaginatedMetaData', hasNext: boolean, hasPrev: boolean, page: number, size: number, total_item: number, total_page: number } } };

export type ProgramsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProgramsQuery = { __typename?: 'Query', programs: Array<{ __typename?: 'Program', program: string }> };

export type SemestersQueryVariables = Exact<{ [key: string]: never; }>;


export type SemestersQuery = { __typename?: 'Query', semesters?: Array<{ __typename?: 'Semester', display_name: string, semester_id: string, type?: string | null, year?: string | null }> | null };

export type SubjectsQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']['input']>;
  isAscending?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SubjectsQuery = { __typename?: 'Query', subjects: { __typename?: 'PaginatedSubject', data: Array<{ __typename?: 'Subject', display_name?: string | null, faculty_id?: string | null, subject_id: string, total_point?: number | null, faculty?: { __typename?: 'Faculty', display_name: string, faculty_id: string, full_name?: string | null } | null }>, meta: { __typename?: 'PaginatedMetaData', hasNext: boolean, hasPrev: boolean, page: number, size: number, total_item: number, total_page: number } } };

export type SubjectsWithPointsQueryVariables = Exact<{
  filter?: InputMaybe<FilterArgs>;
  sort?: InputMaybe<SortArgs>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SubjectsWithPointsQuery = { __typename?: 'Query', subjects: { __typename?: 'PaginatedSubject', data: Array<{ __typename?: 'Subject', display_name?: string | null, faculty_id?: string | null, subject_id: string, total_point?: number | null, faculty?: { __typename?: 'Faculty', display_name: string, faculty_id: string, full_name?: string | null } | null, points?: Array<{ __typename?: 'GroupedPoint', average_point: number, class_num: number, id: string, max_point?: number | null, point?: number | null, display_name?: string | null }> | null }>, meta: { __typename?: 'PaginatedMetaData', hasNext: boolean, hasPrev: boolean, page: number, size: number, total_item: number, total_page: number } } };


export const CommentQuantityDocument = gql`
    query CommentQuantity($filter: FilterArgs) {
  positive: commentQuantity(type: "positive", filter: $filter) {
    quantity
    type
  }
  negative: commentQuantity(type: "negative", filter: $filter) {
    quantity
    type
  }
  all: commentQuantity(filter: $filter) {
    quantity
    type
  }
}
    `;

/**
 * __useCommentQuantityQuery__
 *
 * To run a query within a React component, call `useCommentQuantityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentQuantityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentQuantityQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCommentQuantityQuery(baseOptions?: Apollo.QueryHookOptions<CommentQuantityQuery, CommentQuantityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentQuantityQuery, CommentQuantityQueryVariables>(CommentQuantityDocument, options);
      }
export function useCommentQuantityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentQuantityQuery, CommentQuantityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentQuantityQuery, CommentQuantityQueryVariables>(CommentQuantityDocument, options);
        }
export function useCommentQuantitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CommentQuantityQuery, CommentQuantityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CommentQuantityQuery, CommentQuantityQueryVariables>(CommentQuantityDocument, options);
        }
export type CommentQuantityQueryHookResult = ReturnType<typeof useCommentQuantityQuery>;
export type CommentQuantityLazyQueryHookResult = ReturnType<typeof useCommentQuantityLazyQuery>;
export type CommentQuantitySuspenseQueryHookResult = ReturnType<typeof useCommentQuantitySuspenseQuery>;
export type CommentQuantityQueryResult = Apollo.QueryResult<CommentQuantityQuery, CommentQuantityQueryVariables>;
export function refetchCommentQuantityQuery(variables?: CommentQuantityQueryVariables) {
      return { query: CommentQuantityDocument, variables: variables }
    }
export const CommentListDocument = gql`
    query CommentList($filter: FilterArgs, $page: Int, $sort: SortArgs, $type: String) {
  comments(filter: $filter, pagination: {page: $page}, sort: $sort, type: $type) {
    data {
      comment_id
      display_name
      type
      class {
        class_id
        class_type
        display_name
        participating_student
        program
        total_student
      }
    }
    meta {
      hasNext
      hasPrev
      page
      size
      total_item
      total_page
    }
  }
}
    `;

/**
 * __useCommentListQuery__
 *
 * To run a query within a React component, call `useCommentListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCommentListQuery(baseOptions?: Apollo.QueryHookOptions<CommentListQuery, CommentListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentListQuery, CommentListQueryVariables>(CommentListDocument, options);
      }
export function useCommentListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentListQuery, CommentListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentListQuery, CommentListQueryVariables>(CommentListDocument, options);
        }
export function useCommentListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CommentListQuery, CommentListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CommentListQuery, CommentListQueryVariables>(CommentListDocument, options);
        }
export type CommentListQueryHookResult = ReturnType<typeof useCommentListQuery>;
export type CommentListLazyQueryHookResult = ReturnType<typeof useCommentListLazyQuery>;
export type CommentListSuspenseQueryHookResult = ReturnType<typeof useCommentListSuspenseQuery>;
export type CommentListQueryResult = Apollo.QueryResult<CommentListQuery, CommentListQueryVariables>;
export function refetchCommentListQuery(variables?: CommentListQueryVariables) {
      return { query: CommentListDocument, variables: variables }
    }
export const CriteriasDocument = gql`
    query Criterias($filter: FilterArgs, $isAscending: Boolean, $page: Int) {
  criterias(
    filter: $filter
    pagination: {page: $page, size: 10}
    sort: {isAscending: $isAscending}
  ) {
    data {
      display_name
      criteria_id
    }
    meta {
      hasNext
      hasPrev
      page
      size
      total_item
      total_page
    }
  }
}
    `;

/**
 * __useCriteriasQuery__
 *
 * To run a query within a React component, call `useCriteriasQuery` and pass it any options that fit your needs.
 * When your component renders, `useCriteriasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCriteriasQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      isAscending: // value for 'isAscending'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useCriteriasQuery(baseOptions?: Apollo.QueryHookOptions<CriteriasQuery, CriteriasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CriteriasQuery, CriteriasQueryVariables>(CriteriasDocument, options);
      }
export function useCriteriasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CriteriasQuery, CriteriasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CriteriasQuery, CriteriasQueryVariables>(CriteriasDocument, options);
        }
export function useCriteriasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CriteriasQuery, CriteriasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CriteriasQuery, CriteriasQueryVariables>(CriteriasDocument, options);
        }
export type CriteriasQueryHookResult = ReturnType<typeof useCriteriasQuery>;
export type CriteriasLazyQueryHookResult = ReturnType<typeof useCriteriasLazyQuery>;
export type CriteriasSuspenseQueryHookResult = ReturnType<typeof useCriteriasSuspenseQuery>;
export type CriteriasQueryResult = Apollo.QueryResult<CriteriasQuery, CriteriasQueryVariables>;
export function refetchCriteriasQuery(variables?: CriteriasQueryVariables) {
      return { query: CriteriasDocument, variables: variables }
    }
export const OverallCriteriaPointsEachSemesterDocument = gql`
    query OverallCriteriaPointsEachSemester($class_type: String, $faculty_id: String, $lecturer_id: String, $program: String, $subjects: [String!]) {
  groupedPoints(
    groupEntity: "Semester"
    size: 30
    class_type: $class_type
    faculty_id: $faculty_id
    lecturer_id: $lecturer_id
    program: $program
    subjects: $subjects
  ) {
    data {
      average_point
      class_num
      display_name
      id
      max_point
      point
    }
  }
}
    `;

/**
 * __useOverallCriteriaPointsEachSemesterQuery__
 *
 * To run a query within a React component, call `useOverallCriteriaPointsEachSemesterQuery` and pass it any options that fit your needs.
 * When your component renders, `useOverallCriteriaPointsEachSemesterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOverallCriteriaPointsEachSemesterQuery({
 *   variables: {
 *      class_type: // value for 'class_type'
 *      faculty_id: // value for 'faculty_id'
 *      lecturer_id: // value for 'lecturer_id'
 *      program: // value for 'program'
 *      subjects: // value for 'subjects'
 *   },
 * });
 */
export function useOverallCriteriaPointsEachSemesterQuery(baseOptions?: Apollo.QueryHookOptions<OverallCriteriaPointsEachSemesterQuery, OverallCriteriaPointsEachSemesterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OverallCriteriaPointsEachSemesterQuery, OverallCriteriaPointsEachSemesterQueryVariables>(OverallCriteriaPointsEachSemesterDocument, options);
      }
export function useOverallCriteriaPointsEachSemesterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OverallCriteriaPointsEachSemesterQuery, OverallCriteriaPointsEachSemesterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OverallCriteriaPointsEachSemesterQuery, OverallCriteriaPointsEachSemesterQueryVariables>(OverallCriteriaPointsEachSemesterDocument, options);
        }
export function useOverallCriteriaPointsEachSemesterSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OverallCriteriaPointsEachSemesterQuery, OverallCriteriaPointsEachSemesterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OverallCriteriaPointsEachSemesterQuery, OverallCriteriaPointsEachSemesterQueryVariables>(OverallCriteriaPointsEachSemesterDocument, options);
        }
export type OverallCriteriaPointsEachSemesterQueryHookResult = ReturnType<typeof useOverallCriteriaPointsEachSemesterQuery>;
export type OverallCriteriaPointsEachSemesterLazyQueryHookResult = ReturnType<typeof useOverallCriteriaPointsEachSemesterLazyQuery>;
export type OverallCriteriaPointsEachSemesterSuspenseQueryHookResult = ReturnType<typeof useOverallCriteriaPointsEachSemesterSuspenseQuery>;
export type OverallCriteriaPointsEachSemesterQueryResult = Apollo.QueryResult<OverallCriteriaPointsEachSemesterQuery, OverallCriteriaPointsEachSemesterQueryVariables>;
export function refetchOverallCriteriaPointsEachSemesterQuery(variables?: OverallCriteriaPointsEachSemesterQueryVariables) {
      return { query: OverallCriteriaPointsEachSemesterDocument, variables: variables }
    }
export const FacultiesDocument = gql`
    query Faculties {
  faculties(pagination: {size: 100}) {
    data {
      display_name
      faculty_id
      full_name
    }
  }
}
    `;

/**
 * __useFacultiesQuery__
 *
 * To run a query within a React component, call `useFacultiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFacultiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFacultiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFacultiesQuery(baseOptions?: Apollo.QueryHookOptions<FacultiesQuery, FacultiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FacultiesQuery, FacultiesQueryVariables>(FacultiesDocument, options);
      }
export function useFacultiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FacultiesQuery, FacultiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FacultiesQuery, FacultiesQueryVariables>(FacultiesDocument, options);
        }
export function useFacultiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FacultiesQuery, FacultiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FacultiesQuery, FacultiesQueryVariables>(FacultiesDocument, options);
        }
export type FacultiesQueryHookResult = ReturnType<typeof useFacultiesQuery>;
export type FacultiesLazyQueryHookResult = ReturnType<typeof useFacultiesLazyQuery>;
export type FacultiesSuspenseQueryHookResult = ReturnType<typeof useFacultiesSuspenseQuery>;
export type FacultiesQueryResult = Apollo.QueryResult<FacultiesQuery, FacultiesQueryVariables>;
export function refetchFacultiesQuery(variables?: FacultiesQueryVariables) {
      return { query: FacultiesDocument, variables: variables }
    }
export const LecturerstWithPointsDocument = gql`
    query LecturerstWithPoints($filter: FilterArgs, $sort: SortArgs, $page: Int) {
  lecturers(filter: $filter, sort: $sort, pagination: {page: $page, size: 10}) {
    data {
      birth_date
      display_name
      email
      faculty_id
      gender
      learning
      learning_position
      lecturer_id
      mscb
      ngach
      phone
      position
      total_point
      username
      faculty {
        display_name
        faculty_id
        full_name
      }
      points(filter: $filter) {
        average_point
        class_num
        id
        max_point
        point
        display_name
      }
    }
    meta {
      hasNext
      hasPrev
      page
      size
      total_item
      total_page
    }
  }
}
    `;

/**
 * __useLecturerstWithPointsQuery__
 *
 * To run a query within a React component, call `useLecturerstWithPointsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLecturerstWithPointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLecturerstWithPointsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useLecturerstWithPointsQuery(baseOptions?: Apollo.QueryHookOptions<LecturerstWithPointsQuery, LecturerstWithPointsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LecturerstWithPointsQuery, LecturerstWithPointsQueryVariables>(LecturerstWithPointsDocument, options);
      }
export function useLecturerstWithPointsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LecturerstWithPointsQuery, LecturerstWithPointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LecturerstWithPointsQuery, LecturerstWithPointsQueryVariables>(LecturerstWithPointsDocument, options);
        }
export function useLecturerstWithPointsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LecturerstWithPointsQuery, LecturerstWithPointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LecturerstWithPointsQuery, LecturerstWithPointsQueryVariables>(LecturerstWithPointsDocument, options);
        }
export type LecturerstWithPointsQueryHookResult = ReturnType<typeof useLecturerstWithPointsQuery>;
export type LecturerstWithPointsLazyQueryHookResult = ReturnType<typeof useLecturerstWithPointsLazyQuery>;
export type LecturerstWithPointsSuspenseQueryHookResult = ReturnType<typeof useLecturerstWithPointsSuspenseQuery>;
export type LecturerstWithPointsQueryResult = Apollo.QueryResult<LecturerstWithPointsQuery, LecturerstWithPointsQueryVariables>;
export function refetchLecturerstWithPointsQuery(variables?: LecturerstWithPointsQueryVariables) {
      return { query: LecturerstWithPointsDocument, variables: variables }
    }
export const ProgramsDocument = gql`
    query Programs {
  programs {
    program
  }
}
    `;

/**
 * __useProgramsQuery__
 *
 * To run a query within a React component, call `useProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProgramsQuery(baseOptions?: Apollo.QueryHookOptions<ProgramsQuery, ProgramsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument, options);
      }
export function useProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramsQuery, ProgramsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument, options);
        }
export function useProgramsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProgramsQuery, ProgramsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument, options);
        }
export type ProgramsQueryHookResult = ReturnType<typeof useProgramsQuery>;
export type ProgramsLazyQueryHookResult = ReturnType<typeof useProgramsLazyQuery>;
export type ProgramsSuspenseQueryHookResult = ReturnType<typeof useProgramsSuspenseQuery>;
export type ProgramsQueryResult = Apollo.QueryResult<ProgramsQuery, ProgramsQueryVariables>;
export function refetchProgramsQuery(variables?: ProgramsQueryVariables) {
      return { query: ProgramsDocument, variables: variables }
    }
export const SemestersDocument = gql`
    query Semesters {
  semesters {
    display_name
    semester_id
    type
    year
  }
}
    `;

/**
 * __useSemestersQuery__
 *
 * To run a query within a React component, call `useSemestersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSemestersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSemestersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSemestersQuery(baseOptions?: Apollo.QueryHookOptions<SemestersQuery, SemestersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SemestersQuery, SemestersQueryVariables>(SemestersDocument, options);
      }
export function useSemestersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SemestersQuery, SemestersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SemestersQuery, SemestersQueryVariables>(SemestersDocument, options);
        }
export function useSemestersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SemestersQuery, SemestersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SemestersQuery, SemestersQueryVariables>(SemestersDocument, options);
        }
export type SemestersQueryHookResult = ReturnType<typeof useSemestersQuery>;
export type SemestersLazyQueryHookResult = ReturnType<typeof useSemestersLazyQuery>;
export type SemestersSuspenseQueryHookResult = ReturnType<typeof useSemestersSuspenseQuery>;
export type SemestersQueryResult = Apollo.QueryResult<SemestersQuery, SemestersQueryVariables>;
export function refetchSemestersQuery(variables?: SemestersQueryVariables) {
      return { query: SemestersDocument, variables: variables }
    }
export const SubjectsDocument = gql`
    query Subjects($keyword: String, $isAscending: Boolean, $page: Int) {
  subjects(
    filter: {keyword: $keyword}
    pagination: {page: $page, size: 10}
    sort: {isAscending: $isAscending}
  ) {
    data {
      display_name
      faculty_id
      subject_id
      total_point
      faculty {
        display_name
        faculty_id
        full_name
      }
    }
    meta {
      hasNext
      hasPrev
      page
      size
      total_item
      total_page
    }
  }
}
    `;

/**
 * __useSubjectsQuery__
 *
 * To run a query within a React component, call `useSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectsQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      isAscending: // value for 'isAscending'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSubjectsQuery(baseOptions?: Apollo.QueryHookOptions<SubjectsQuery, SubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectsQuery, SubjectsQueryVariables>(SubjectsDocument, options);
      }
export function useSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectsQuery, SubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectsQuery, SubjectsQueryVariables>(SubjectsDocument, options);
        }
export function useSubjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SubjectsQuery, SubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubjectsQuery, SubjectsQueryVariables>(SubjectsDocument, options);
        }
export type SubjectsQueryHookResult = ReturnType<typeof useSubjectsQuery>;
export type SubjectsLazyQueryHookResult = ReturnType<typeof useSubjectsLazyQuery>;
export type SubjectsSuspenseQueryHookResult = ReturnType<typeof useSubjectsSuspenseQuery>;
export type SubjectsQueryResult = Apollo.QueryResult<SubjectsQuery, SubjectsQueryVariables>;
export function refetchSubjectsQuery(variables?: SubjectsQueryVariables) {
      return { query: SubjectsDocument, variables: variables }
    }
export const SubjectsWithPointsDocument = gql`
    query SubjectsWithPoints($filter: FilterArgs, $sort: SortArgs, $page: Int) {
  subjects(filter: $filter, sort: $sort, pagination: {page: $page, size: 10}) {
    data {
      display_name
      faculty_id
      subject_id
      total_point
      faculty {
        display_name
        faculty_id
        full_name
      }
      points(filter: $filter) {
        average_point
        class_num
        id
        max_point
        point
        display_name
      }
    }
    meta {
      hasNext
      hasPrev
      page
      size
      total_item
      total_page
    }
  }
}
    `;

/**
 * __useSubjectsWithPointsQuery__
 *
 * To run a query within a React component, call `useSubjectsWithPointsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectsWithPointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectsWithPointsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSubjectsWithPointsQuery(baseOptions?: Apollo.QueryHookOptions<SubjectsWithPointsQuery, SubjectsWithPointsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectsWithPointsQuery, SubjectsWithPointsQueryVariables>(SubjectsWithPointsDocument, options);
      }
export function useSubjectsWithPointsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectsWithPointsQuery, SubjectsWithPointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectsWithPointsQuery, SubjectsWithPointsQueryVariables>(SubjectsWithPointsDocument, options);
        }
export function useSubjectsWithPointsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SubjectsWithPointsQuery, SubjectsWithPointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubjectsWithPointsQuery, SubjectsWithPointsQueryVariables>(SubjectsWithPointsDocument, options);
        }
export type SubjectsWithPointsQueryHookResult = ReturnType<typeof useSubjectsWithPointsQuery>;
export type SubjectsWithPointsLazyQueryHookResult = ReturnType<typeof useSubjectsWithPointsLazyQuery>;
export type SubjectsWithPointsSuspenseQueryHookResult = ReturnType<typeof useSubjectsWithPointsSuspenseQuery>;
export type SubjectsWithPointsQueryResult = Apollo.QueryResult<SubjectsWithPointsQuery, SubjectsWithPointsQueryVariables>;
export function refetchSubjectsWithPointsQuery(variables?: SubjectsWithPointsQueryVariables) {
      return { query: SubjectsWithPointsDocument, variables: variables }
    }