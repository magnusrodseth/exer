import moment from 'moment';

const dateToDDMMYYYY = (date: Date) => moment(date).format('DD.MM.YYYY');

export default dateToDDMMYYYY;
