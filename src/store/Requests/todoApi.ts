import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query/react';
import { ITodoItem, ITodoList } from '../../interfaces';

export const todosApi = createApi({
  reducerPath: 'patientsApi',
  tagTypes: ['todos'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASEURL }),
  endpoints: (builder) => ({
    getTodosList: builder.query<ITodoList, void>({
      query() {
        return {
          url: `/todos`,
          method: 'GET',
        };
      },
      providesTags: ['todos'],
    }),
    getTodoById: builder.query<ITodoItem, number>({
      query(id) {
        return {
          url: `/todos/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['todos'],
    }),
    updateTodo: builder.mutation({
      query: ({ id, completed, title }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: { id: id, title: title, completed: completed },
      }),
      invalidatesTags: ['todos'],
    }),
    createNewTodo: builder.mutation({
      query: ({ id, completed, title }) => ({
        url: `/todos`,
        method: 'POST',
        body: { id: id, title: title, completed: completed },
      }),
      invalidatesTags: ['todos'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['todos'],
    }),
    deleteCompletedTodos: builder.mutation<void, void>({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery): Promise<any> {
        const result: QueryReturnValue<
          unknown,
          FetchBaseQueryError,
          FetchBaseQueryMeta
        > = await baseQuery({ url: '/todos', method: 'GET' });

        if (result.error) {
          return { error: result.error };
        }

        const completedTodos = (result?.data as ITodoList)?.filter(
          (todo: ITodoItem) => todo.completed
        );

        for (const todo of completedTodos) {
          const deleteResult = await baseQuery({
            url: `/todos/${todo.id}`,
            method: 'DELETE',
          });
          if (deleteResult.error) {
            return { error: deleteResult.error };
          }
        }

        return { data: undefined };
      },
      invalidatesTags: ['todos'],
    }),
  }),
});

export const {
  useGetTodosListQuery,
  useUpdateTodoMutation,
  useCreateNewTodoMutation,
  useDeleteCompletedTodosMutation,
  useDeleteTodoMutation,
  useGetTodoByIdQuery
} = todosApi;
