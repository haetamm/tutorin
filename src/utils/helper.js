import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'

export const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number); 
}

export const getHumanReadableDiff = (dateString) => {
  let date;

  try {
    if (dateString.includes('T')) {
      date = parseISO(dateString);
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
  } catch (error) {
    console.error('Error parsing date:', error);
    return 'Invalid date';
  }

  return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
}

export const formatDate = (isoDateString) => {
  const date = parseISO(isoDateString);

  return format(date, 'dd MMMM yyyy', { locale: enUS });
}

export const scrollTop = () => {
  window.scrollTo(0, 0)
}