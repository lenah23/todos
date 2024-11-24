import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IEditTodoValues, IStatusesList, statusesEnum } from '../../interfaces';
import {
  useCreateNewTodoMutation,
  useDeleteCompletedTodosMutation,
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
  useGetTodosListQuery,
  useUpdateTodoMutation,
} from '../../store/Requests/todoApi';



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
  const [updateTodoReq, { isSuccess: updateTodoSuccess }] =
    useUpdateTodoMutation();
  const [createTodoReq] = useCreateNewTodoMutation();
  const [clearCompletedTodods] = useDeleteCompletedTodosMutation();
  const [deleteTododReq, {isSuccess: deleteTodoSuccess}] = useDeleteTodoMutation();
  const { data: todoByIdData, isSuccess: todoByIdDataSuccess } =
    useGetTodoByIdQuery(todoId!, { skip: !todoId });

  // useform
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FieldValues | IEditTodoValues>({
    defaultValues: {
      id: todoByIdData?.id,
      completed: todoByIdData?.completed,
      title: todoByIdData?.title,
    },
  });

  const onSubmit = (data: FieldValues | IEditTodoValues) => {
    updateTodoReq(data);
  };

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
      toast.success('updated successfully');
      handleClose();
    }
    if (deleteTodoSuccess) {
      toast.success('deleted successfully');
      handleClose();
    }
  }, [updateTodoSuccess, deleteTodoSuccess]);

  useEffect(() => {
    if (todoByIdDataSuccess) {
      setValue('id', todoByIdData?.id);
      setValue('completed', todoByIdData?.completed);
      setValue('title', todoByIdData?.title);
    }
  }, [todoByIdDataSuccess]);

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

  return {
    open,
    control,
    todoList,
    itemsLeft,
    inputValue,
    activeStatus,
    statusesList,
    activeAction,
    handleClearCompletedTodos,
    setActiveStatus,
    handleClickOpen,
    setActiveAction,
    deleteTododReq,
    setInputValue,
    updateTodoReq,
    handleSubmit,
    handleClose,
    addNewTodo,
    setTodoId,
    onSubmit,
  };
};

export default UseTodoHooks;
