const currencyOpt = {
  style: "currency",
  currency: "RUB",
};

function formatBillNumber(string) {
  return string.split("_")[1];
}

function formatPhoneNumber(num) {
  const str = String(num);
  const cleaned = str.replace(/\D/g, "");
  const match = cleaned.match(/^(7)(9[5,4]9)(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]}(${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  return "нет номера телефона";
}

function formatAddress(address) {
  const parts = address.split(",");
  const [
    country,
    region,
    district,
    city,
    settlement,
    street,
    house,
    flat,
    entrance,
    floor,
    index,
  ] = parts;
  return flat
    ? `${index}, ${country}, ${region}, ${district}, ${
        city ? city : settlement
      }, ${street}, ${house}, ${flat}`
    : `${index}, ${country}, ${region}, ${district}, ${
        city ? city : settlement
      }, ${street}, ${house}`;
}

function formatDeposit(sum) {
  return new Intl.NumberFormat("ru-RU", currencyOpt).format(Number(sum));
}

function formatFee(tarif) {
  if (tarif.rentperiod == 1) {
    return `${new Intl.NumberFormat("ru-RU", currencyOpt).format(
      Number(tarif.above)
    )} / месяц`;
  } else {
    return `${new Intl.NumberFormat("ru-RU", currencyOpt).format(
      Number(tarif.above)
    )} / сутки`;
  }
}

function formatDateToLocale(date) {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("ru-RU", options);
}

function calcNextFeeDate(tarif) {
  let d = new Date();
  if (tarif.rentperiod == 1) {
    d.setMonth(d.getMonth() + 1, 1);
  } else {
    d.setDate(d.getDate() + 1);
  }
  return formatDateToLocale(d);
}

function renderUserListItem(heading, date) {
  return `<li class="user__item user__item--next">
  <span>${heading}</span>
  <span>${date}</span>
</li>`;
}

function calcExpMonth(deposit, fee) {
  const m = Math.floor(Number(deposit) / Number(fee)) + 1;
  let d = new Date();
  d.setMonth(d.getMonth() + m, 1);
  return formatDateToLocale(d);
}

function calcExpDay(deposit, fee) {
  const m = Math.floor(Number(deposit) / Number(fee));
  let d = new Date();
  d.setDate(d.getDate() + m);
  return formatDateToLocale(d);
}

function renderExpDate(deposit, tarif) {
  if (Number(deposit) <= 0) {
    return "";
  }
  if (tarif.rentperiod == 1) {
    return renderUserListItem("Активен до", calcExpMonth(deposit, tarif.above));
  }
  if (tarif.rentperiod == 2) {
    return renderUserListItem("Активен до", calcExpDay(deposit, tarif.above));
  }
}

function renderNextFee(deposit, tarif) {
  if (Number(deposit) <= 0) {
    return "";
  } else {
    return renderUserListItem("Следующее списание", calcNextFeeDate(tarif));
  }
}

function userPage(user) {
  const { name, address, phone, login, pass, deposit, blocked, tarif } = user;
  return `        <section class="user">
  <h1 class="user__title">Личный кабинет абонента</h1>
  <div class="user__pi">
    <p class="user__fio main-heading">${name}</p>
    <p class="user_address">
      ${formatAddress(address)}
    </p>
    <p class="user__phone">${formatPhoneNumber(phone)}</p>
  </div>
  <ul class="user__list">
    <li class="user__item">
      <span>Номер лицевого счёта</span>
      <span>${formatBillNumber(login)}</span>
    </li>
    <li class="user__item">
      <span>Баланс</span>
      <span>${formatDeposit(deposit)}</span>
    </li>
    <li class="user__item user__item--tarif">
      <span>Статус</span>
      <span>${blocked == 0 ? "Активен" : "Отключен"}</span>
    </li>
    ${renderExpDate(deposit, tarif)}
  </ul>
  <div class="user__tarif">
    <p class="user__tarif-heading">Тарифный план</p>
    <ul class="user__list">
      <li class="user__item user__item--tarif">
        <span>Название</span>
        <span>${tarif.tarname}</span>
      </li>
      <li class="user__item user__item--tarif">
        <span>Абонплата</span>
        <span>${formatFee(tarif)}</span>
      </li>
      ${renderNextFee(deposit, tarif)}
    </ul>
  </div>
</section>`;
}

module.exports = { userPage };
