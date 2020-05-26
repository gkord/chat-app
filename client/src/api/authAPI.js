import request from './request';

const register = (data) => {
  return request({
    url: '/users/register',
    method: 'POST',
    data,
  });
};

const login = (data) => {
  return request({
    url: '/users/login',
    method: 'POST',
    data,
  });
};

export default {
  register,
  login,
};
