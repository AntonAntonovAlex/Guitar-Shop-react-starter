import { ErrorType } from '../types/error';
import request from 'axios';
import { HttpCode } from '../const';
import { toast } from 'react-toastify';


export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        toast.error(response.data.error);
        break;
      case HttpCode.NotFound:
        toast.info(response.data.error);
        break;
      default:
        toast.error(response.data.error);
        break;
    }
  } else {
    toast.error(error.message);
  }
};
