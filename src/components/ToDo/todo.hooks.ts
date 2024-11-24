import { useEffect, useState } from 'react';
import {
  useCreateNewTodoMutation,
  useDeleteCompletedTodosMutation,
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
  useGetTodosListQuery,
  useUpdateTodoMutation,
} from '../../store/Requests/todoApi';
import { IStatusesList, statusesEnum } from '../../interfaces';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IEditTodoValues {
  id: number;
  completed: boolean;
  title: string;
}

const UseTodoHooks = () => {
  const statusesList: IStatusesList[] = [
    {
      id: 1,
      label: statusesEnum.ALL,
    },
    {
      id: 2,
      label: statusesEnum.ACTIVE,
    },
    {
      id: 3,
      label: statusesEnum.COMPLETED,
    },
  ];

  // states
  const [todoId, setTodoId] = useState<number>();
  const [activeAction, setActiveAction] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [itemsLeft, setItemsLeft] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [activeStatus, setActiveStatus] = useState<statusesEnum>(
    statusesEnum.ALL
  );

  // requests
  const { data: todoList } = useGetTodosListQuery();
  const [updateTodoReq, {isSuccess: updateTodoSuccess}] = useUpdateTodoMutation();
  const [createTodoReq] = useCreateNewTodoMutation();
  const [clearCompletedTodods] = useDeleteCompletedTodosMutation();
  const [deleteTododReq] = useDeleteTodoMutation();
  const { data: todoByIdData, isSuccess: todoByIdDataSuccess } = useGetTodoByIdQuery(
    todoId!,
    { skip: !todoId }
  );

  console.log(todoByIdData, 'todoByIdData');
  // useEffects
  useEffect(() => {
    if (todoList) {
      setItemsLeft(
        todoList?.filter((item) => item?.completed === false)?.length
      );
    }
  }, [todoList]);

  useEffect(() => {
    if (updateTodoSuccess) {
      toast.success(("updated successfully"));
      handleClose();
    }
  }, [updateTodoSuccess]);

  // functions
  const addNewTodo = async () => {
    if (inputValue.trim()) {
      try {
        await createTodoReq({
          title: inputValue,
          completed: false,
        }).unwrap();
        setInputValue('');
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
    }
  };

  const handleClearCompletedTodos = async () => {
    await clearCompletedTodods();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    control
  } = useForm<FieldValues | IEditTodoValues>({
    defaultValues: {
      id: todoByIdData?.id,
      completed: todoByIdData?.completed,
      title: todoByIdData?.title,
    },
  });

  const onSubmit = (data: FieldValues | IEditTodoValues) => {
    updateTodoReq(data);
    console.log(data, 'dataaaaaaaaaa');
  };

  useEffect(() => {
    if (todoByIdDataSuccess) {
      setValue('id', todoByIdData?.id);
      setValue('completed', todoByIdData?.completed);
      setValue('title', todoByIdData?.title)
    }
  }, [todoByIdDataSuccess]);

  return {
    todoList,
    itemsLeft,
    inputValue,
    activeStatus,
    statusesList,
    setInputValue,
    addNewTodo,
    setActiveStatus,
    updateTodoReq,
    handleClearCompletedTodos,
    open,
    handleClickOpen,
    handleClose,
    deleteTododReq,
    activeAction,
    setActiveAction,
    setTodoId,
    handleSubmit,
    onSubmit,
    register,
    control,
  };
};

export default UseTodoHooks;
