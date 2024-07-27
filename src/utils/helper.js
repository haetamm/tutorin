import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'

export const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number); 
}

export const getHumanReadableDiff = (isoDateString) => {
  const date = parseISO(isoDateString)

  return formatDistanceToNow(date, { addSuffix: true, locale: enUS})
}

export const formatDate = (isoDateString) => {
  const date = parseISO(isoDateString);

  return format(date, 'dd MMMM', { locale: enUS });
};