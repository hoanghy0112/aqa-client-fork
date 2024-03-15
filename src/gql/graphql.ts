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
  semester: Semester;
  /** This field may be wrong because I just get the first class type to determine this criteria type */
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
  class_id?: InputMaybe<Scalars['String']['input']>;
  class_type?: InputMaybe<Scalars['String']['input']>;
  criteria_id?: InputMaybe<Scalars['String']['input']>;
  faculty_id?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  lecturer_id?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  program?: InputMaybe<Scalars['String']['input']>;
  semester_id?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  subjects?: InputMaybe<Array<Scalars['String']['input']>>;
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
  type: Scalars['String']['output'];
  year: Scalars['String']['output'];
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
  faculty: Faculty;
  faculty_id: Scalars['String']['output'];
  points: Array<GroupedPoint>;
  subject_id: Scalars['String']['output'];
  total_point?: Maybe<Scalars['Float']['output']>;
};


export type SubjectPointsArgs = {
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

export type CommentQuantityQueryVariables = Exact<{
  filter?: InputMaybe<FilterArgs>;
}>;


export type CommentQuantityQuery = { __typename?: 'Query', positive: { __typename?: 'CommentQuantity', quantity: number, type: string }, negative: { __typename?: 'CommentQuantity', quantity: number, type: string }, all: { __typename?: 'CommentQuantity', quantity: number, type: string } };

export type FacultiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FacultiesQuery = { __typename?: 'Query', faculties: { __typename?: 'PaginatedFaculty', data: Array<{ __typename?: 'Faculty', display_name: string, faculty_id: string, full_name?: string | null }> } };


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