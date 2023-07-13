import { toast } from 'react-toastify';

export const notify = (type = 'WARN', msg) => {
  switch (type) {
    case 'ERROR':
      toast.error(msg);
      break;
    case 'INFO':
      toast.info(msg);
      break;
    case 'SUCCESS':
      toast.success(msg);
      break;
    default:
      toast.warning(msg);
  }
};

export const generateDropdownData = (data, isLabelAndValueSame = false) => {
  const dropdownData = [];
  if (isLabelAndValueSame) {
    data.forEach((item) => {
      const dropdownItem = {
        label: item.key,
        value: item.key,
      };
      dropdownData.push(dropdownItem);
    });
  } else {
    data.forEach((item) => {
      const dropdownItem = {
        label: item.val,
        value: item.key,
      };
      dropdownData.push(dropdownItem);
    });
  }

  return dropdownData;
};

export const getApiErrorMsg = (error) => {
  if (error.response && error.response.data && error.response.data.message) return error.response.data.message;
  return error.message;
};

export const cssvar = (name) => {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};

export const getMin = (array) => {
  let min = 0;
  array.forEach((i) => {
    if (i < min) min = i;
  });
  return min;
};

export const sortArrayByField = (arrayToBeSorted, fieldName, sortBy) => {
  let sortedData = [];
  if (sortBy === 'asc')
    sortedData = arrayToBeSorted.sort((a, b) => (a[fieldName] > b[fieldName]) - (b[fieldName] > a[fieldName]));
  else sortedData = arrayToBeSorted.sort((a, b) => (a[fieldName] < b[fieldName]) - (b[fieldName] < a[fieldName]));
  return sortedData;
};
