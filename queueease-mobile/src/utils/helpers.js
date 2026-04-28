/**
 * Utility helpers for QueueEase
 */

/**
 * Format a date string to a readable format.
 * e.g. "2026-04-14" → "Mon, 14 Apr 2026"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Format a number of minutes into a human-readable duration.
 * e.g. 90 → "1h 30m", 45 → "45 mins"
 */
export const formatWaitTime = (minutes) => {
  if (!minutes && minutes !== 0) return '--';
  if (minutes < 60) return `${minutes} mins`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

/**
 * Truncate a string to a max length and append ellipsis.
 */
export const truncate = (str, maxLength = 40) => {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength).trimEnd() + '...' : str;
};

/**
 * Get initials from a full name, e.g. "Anita Desai" → "AD"
 */
export const getInitials = (name = '') => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Build a Google Maps directions URL for a given address or lat/lng.
 */
export const buildMapsUrl = (address, lat, lng) => {
  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || '')}`;
};

/**
 * Unwrap API payloads that use the backend's { success, message, data } shape.
 */
export const unwrapApiData = (payload) => {
  if (!payload) return null;
  return payload.data ?? payload;
};

/**
 * Normalize clinic payloads so screens can read one consistent shape.
 */
export const normalizeClinic = (payload) => {
  const clinic = unwrapApiData(payload)?.clinic || unwrapApiData(payload);
  if (!clinic || typeof clinic !== 'object') return null;

  const latitude = clinic.latitude !== undefined && clinic.latitude !== null ? Number(clinic.latitude) : null;
  const longitude = clinic.longitude !== undefined && clinic.longitude !== null ? Number(clinic.longitude) : null;
  const addressParts = [clinic.address, clinic.city, clinic.state, clinic.pincode].filter(Boolean);

  return {
    ...clinic,
    id: clinic.id || clinic._id || null,
    clinicImages: Array.isArray(clinic.clinicImages) ? clinic.clinicImages.filter(Boolean) : [],
    doctorName: clinic.doctorName?.trim() || '',
    degree: clinic.degree?.trim() || '',
    college: clinic.college?.trim() || '',
    specialization: clinic.specialization?.trim() || '',
    name: clinic.name?.trim() || '',
    address: clinic.address?.trim() || '',
    city: clinic.city?.trim() || '',
    state: clinic.state?.trim() || '',
    pincode: clinic.pincode?.trim() || '',
    displayAddress: addressParts.join(', '),
    latitude: Number.isFinite(latitude) ? latitude : null,
    longitude: Number.isFinite(longitude) ? longitude : null,
    experience: clinic.experience !== undefined && clinic.experience !== null && clinic.experience !== ''
      ? Number(clinic.experience)
      : null,
    rating: clinic.rating !== undefined && clinic.rating !== null ? Number(clinic.rating) : null,
    reviewsCount: clinic.reviewsCount !== undefined && clinic.reviewsCount !== null ? Number(clinic.reviewsCount) : 0,
    distance: clinic.distance !== undefined && clinic.distance !== null ? Number(clinic.distance) : null,
    queueState: clinic.queueState || null,
  };
};

/**
 * Sleep utility (useful for animations / debounce testing)
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
