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
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+7 (${countryCodes[match[1]]}) ${match[2]}-${match[3]}-${match[4]}`;
  }
  return "нет данных";
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
  const options = {
    style: "currency",
    currency: "RUB",
  };
  return new Intl.NumberFormat("ru-RU", options).format(Number(sum));
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

function userPage(user) {
  const [general, pi, bill, tarif] = user;
  console.log(tarif);
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
    <li class="user__item">
      <span>Статус</span>
      <span>${formatStatus(general, bill?.deposit)}</span>
    </li>
  </ul>
  <div class="user__tarif">
    <p class="user__tarif-heading">Тарифный план</p>
    <ul class="user__list">
      <li class="user__item user__item--tarif">
        <span>Название</span>
        <span>Оптимал 100</span>
      </li>
      <li class="user__item">
        <span>Стоимость</span>
        <span>700</span>
      </li>
      <li class="user__item user__item--next">
        <span>Следующее списание средств</span>
        <span>01 августа 2023 года</span>
      </li>
    </ul>
  </div>
</section>`;
}

module.exports = { userPage };
