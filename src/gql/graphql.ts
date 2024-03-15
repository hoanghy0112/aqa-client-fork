/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
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
  lecturers: PaginatedLecturer;
  points?: Maybe<PaginatedGroupedPoint>;
  subjects: PaginatedSubject;
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
  class_id?: InputMaybe<Scalars['String']['input']>;
  class_type?: InputMaybe<Scalars['String']['input']>;
  criteria_id?: InputMaybe<Scalars['String']['input']>;
  faculty_id?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  lecturer_id?: InputMaybe<Scalars['String']['input']>;
  program?: InputMaybe<Scalars['String']['input']>;
  semester_id?: InputMaybe<Scalars['String']['input']>;
  subjects?: InputMaybe<Array<Scalars['String']['input']>>;
  type: Scalars['String']['input'];
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
  faculty?: Maybe<Faculty>;
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
  type: Scalars['String']['input'];
}>;


export type CommentQuantityQuery = { __typename?: 'Query', commentQuantity: { __typename?: 'CommentQuantity', quantity: number, type: string } };


export const CommentQuantityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommentQuantity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentQuantity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<CommentQuantityQuery, CommentQuantityQueryVariables>;