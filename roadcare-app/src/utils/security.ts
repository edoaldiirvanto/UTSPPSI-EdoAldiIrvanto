/**
 * Security & Data Sanitization Utility
 * RoadCare System - UU PDP No. 27/2022 & OWASP Mitigation
 */

// XSS Sanitizer: Escape dangerous HTML entities
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Phone Number Masking (UU PDP compliance)
export function maskPhoneNumber(phone?: string): string {
  if (!phone) return '08xx-xxxx-xxxx';
  const clean = phone.trim();
  if (clean.length < 8) return '08xx-xxxx';
  const prefix = clean.substring(0, 4);
  const suffix = clean.substring(clean.length - 2);
  return `${prefix}-****-**${suffix}`;
}

// Reporter Name Masking for Public Display
export function maskPersonName(name?: string, isInternalOfficer: boolean = false): string {
  if (!name) return 'Warga Anonim';
  if (isInternalOfficer) return name; // Petugas resmi dinas tetap terbaca
  const parts = name.trim().split(' ');
  return parts.map((part) => {
    if (part.length <= 2) return part;
    return part[0] + '*'.repeat(part.length - 2) + part[part.length - 1];
  }).join(' ');
}

// File Upload Validator (MIME Type & File Size Limitation)
export interface FileValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export function validateImageUpload(file: File): FileValidationResult {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSizeBytes = 5 * 1024 * 1024; // 5 MB

  if (!allowedMimeTypes.includes(file.type)) {
    return {
      isValid: false,
      errorMessage: 'Tipe file tidak diizinkan. Hanya format JPG, PNG, atau WebP yang diperbolehkan.',
    };
  }

  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      errorMessage: 'Ukuran file melebihi batas maksimum 5 MB.',
    };
  }

  // Check dangerous extension disguises
  const lowerName = file.name.toLowerCase();
  const dangerousExtensions = ['.exe', '.sh', '.bat', '.cmd', '.js', '.php', '.phtml', '.py'];
  for (const ext of dangerousExtensions) {
    if (lowerName.endsWith(ext) || lowerName.includes(ext + '.')) {
      return {
        isValid: false,
        errorMessage: 'File memiliki ekstensi mencurigakan yang dilarang oleh sistem keamanan.',
      };
    }
  }

  return { isValid: true };
}

