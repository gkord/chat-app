import request from './request';

const fetch = () => {
  return request({
    url: '/chat/chats',
    method: 'GET',
  });
};

export default fetch;
