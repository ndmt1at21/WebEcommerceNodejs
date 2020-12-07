// Parse queries to array small query
const parseQuery = (url) => {
  if (!url.includes('?')) return [];

  let queries = url.split('?')[1].split('&');
  let queriesObjArr = [];

  queries.forEach((query) => {
    let [queryKey, queryValue] = query.split('=');
    queriesObjArr.push({ queryKey, queryValue });
  });

  return queriesObjArr;
};

// Add query to url
const addQuery = (key, value, url) => {
  if (!key || !value || !url) return url;
  let result = url.slice();

  if (url.includes('?')) {
    return result.concat('&' + key + '=' + value);
  }
  return result.concat('?' + key + '=' + value);
};

// Remove query from url
const removeQuery = (key, value, url) => {
  if (!key || !value || !url || !url.includes('?')) return url;

  let [originalURL, queries] = url.split('?');
  let queryParams = queries.split('&');

  const query = `${key + '=' + value}`.replace(/ /g, '%20');
  queryParams.splice(queryParams.indexOf(query), 1);

  if (queryParams.length == 0) return originalURL;
  return originalURL + '?' + queryParams.join('&');
};

// Selector
const buttonFilter = document.querySelector('.btn_1.filter');
const buttonReset = document.querySelector('.btn_1.reset');
const checkBoxs = document.querySelectorAll('input[name=checkbox]');
const sortField = document.getElementById('sort');

// Set state checkbox and sort if url has its query
document.addEventListener('DOMContentLoaded', (e) => {
  const queryArr = parseQuery(decodeURIComponent(window.location.toString()));

  if (!queryArr) return;

  // Set checkbox value if url has query checkbox
  checkBoxs.forEach((checkbox) => {
    const queryKey = checkbox.getAttribute('data-field');
    const queryValue = checkbox.value;

    if (
      queryArr.find(
        (el) => el.queryKey === queryKey && el.queryValue === queryValue
      )
    ) {
      checkbox.checked = true;
    }
  });

  // Set sort value if url has query sort
  const sortQuery = queryArr.find((el) => el.queryKey === 'sort');
  if (sortQuery) sortField.value = sortQuery.queryValue;
});

// Listen for change and update state checkbox,
// and url
checkBoxs.forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
    e.preventDefault();

    let url = window.location.toString();
    const queryKey = checkbox.getAttribute('data-field');
    const queryValue = checkbox.value;

    if (checkbox.checked) {
      const query = addQuery(queryKey, queryValue, url);
      window.location.href = query;
    } else {
      window.history.pushState({}, '', removeQuery(queryKey, queryValue, url));
    }
  });
});

// Listen sort, delete query sort in url if
// sort option change
sortField.addEventListener('focus', (e) => {
  const preValue = sortField.value;

  sortField.addEventListener('change', (e) => {
    let url = window.location.toString();
    url = removeQuery('sort', preValue, url);
    const query = addQuery('sort', e.target.value, url);
    window.location.href = query;
  });
});

// Button filter
buttonFilter.addEventListener('change', (e) => {
  window.location.reload();
});

// Clear state all checkbox
buttonReset.addEventListener('click', (e) => {
  checkBoxs.forEach((checkbox) => {
    checkbox.checked = false;
  });

  window.history.pushState({}, '', window.location.pathname);
});
