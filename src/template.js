const currencyOpt = {
  style: "currency",
  currency: "RUB",
};

function formatBillNumber(string) {
  return string.split("_")[1];
}

function formatPhoneNumber(num) {
  const countryCodes = {
    72: "959",
    71: "949",
  };
  const str = String(num);
  const cleaned = str.replace(/\D/g, "");
  const match = cleaned.match(/^(\d[7(2|1)])(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+7 (${countryCodes[match[1]]}) ${match[2]}-${match[3]}-${match[4]}`;
  }
  return "нет номера телефона";
}

function formatCity(city) {
  const cities = {
    Чернухино: "пгт.&nbsp;Чернухино",
    Фащевка: "пгт.&nbsp;Фащевка",
    Городище: "п.&nbsp;Городище",
    Малоивановка: "с.&nbsp;Малоивановка",
  };

  return cities[city];
}

function formatStreet(street) {
  if (street.match(/(переулок)/)) {
    return `переулок&nbsp;${street.split(" ")[0]}`;
  }
  if (street.match(/(Молодёжный)/)) {
    return `квартал&nbsp;${street.split(" ")[0]}`;
  }
  return `улица&nbsp;${street}`;
}

function formatBuild(address) {
  if (address?.address_build && address?.address_flat) {
    return `дом&nbsp;${address?.address_build}, кв.&nbsp;${address?.address_flat}`;
  } else {
    return `дом&nbsp;${address?.address_build}`;
  }
}

function formatAddress(address) {
  return `${formatCity(address?.city)}, ${formatStreet(
    address?.address_street
  )}, ${formatBuild(address)}`;
}

function formatDeposit(sum) {
  return new Intl.NumberFormat("ru-RU", currencyOpt).format(Number(sum));
}

function formatStatus(user, userDeposit) {
  if (Number(user?.disable) === 1) {
    return "отключен";
  }
  if (
    Number(userDeposit) > 0 ||
    Number(user?.credit) + Number(userDeposit) > 0
  ) {
    return "активен";
  }
  return "нет оплаты";
}

function formatFee(tarif) {
  if (tarif?.month_fee) {
    return `${new Intl.NumberFormat("ru-RU", currencyOpt).format(
      Number(tarif.month_fee)
    )} / месяц`;
  } else {
    return `${new Intl.NumberFormat("ru-RU", currencyOpt).format(
      Number(tarif.day_fee)
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
  if (tarif?.month_fee) {
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
  if (tarif?.month_fee) {
    return renderUserListItem('Активен до', calcExpMonth(deposit, tarif?.month_fee));
  }
  if (tarif?.day_fee) {
    return renderUserListItem('Активен до', calcExpDay(deposit, tarif?.day_fee));
  }
}

function renderNextFee(deposit, tarif) {
  if (Number(deposit) <= 0) {
    return "";
  } else {
    return renderUserListItem("Следующее списание", calcNextFeeDate(tarif))
  }
}

function userPage(user) {
  const [general, pi, bill, tarif] = user;
  return `        <section class="user">
  <h1 class="user__title">Личный кабинет абонента</h1>
  <div class="user__pi">
    <p class="user__fio">${pi?.fio}</p>
    <p class="user_address">
      ${formatAddress(pi)}
    </p>
    <p class="user__phone">${formatPhoneNumber(pi.phone)}</p>
  </div>
  <ul class="user__list">
    <li class="user__item">
      <span>Номер лицевого счёта</span>
      <span>${formatBillNumber(general.id)}</span>
    </li>
    <li class="user__item">
      <span>Баланс</span>
      <span>${formatDeposit(bill.deposit)}</span>
    </li>
    <li class="user__item user__item--tarif">
      <span>Статус</span>
      <span>${formatStatus(general, bill?.deposit)}</span>
    </li>
    ${renderExpDate(bill?.deposit, tarif)}
  </ul>
  <div class="user__tarif">
    <p class="user__tarif-heading">Тарифный план</p>
    <ul class="user__list">
      <li class="user__item user__item--tarif">
        <span>Название</span>
        <span>${tarif.name}</span>
      </li>
      <li class="user__item user__item--tarif">
        <span>Стоимость</span>
        <span>${formatFee(tarif)}</span>
      </li>
      ${renderNextFee(bill?.deposit, tarif)}
    </ul>
  </div>
</section>`;
}

module.exports = { userPage };
