// For list responses
export type ApiResponse<T> = {
	data: T;
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
};

export type BaseEntity = {
	id: number;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
};

/**
 * Course
 */
export interface Course extends BaseEntity {
	slug: string;
	title: string;
	description: RichText[];
	category: string;
	publicContent: string;
	fullContent?: string | null;
	price: number;
	videoPreview: Image;
	videos: Video[];
	products: Product[];
}

/**
 * Product
 */
export interface Product extends BaseEntity {
	title: string;
	images: Image[];
	category: string;
	subcategory: string;
	description: string;
	courses: Course[];
	formulas: Formula[];
}

/**
 * Formula
 */
export interface Formula extends BaseEntity {
	title: string;
	description: string | null;
	locale: string; // Language locale
	FormulaItem: FormulaItem[]; // Array of FormulaItem
}

/**
 * FormulaItem
 */
export interface FormulaItem extends BaseEntity {
	title: string;
	percentage: string; // Represented as a string since percentages include "%"
	value: string; // Represented as a string to accommodate units like "g", "ml", etc.
	image: Image;
}

/**
 * Video
 */
export interface Video extends BaseEntity {
	title: string;
	courses: Course[];
	description: string | null;
	lessonNumber: string;
	video: Image;
}

/**
 * ImageFormat
 */
export interface ImageFormat {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: string | null;
	size: number;
	width: number;
	height: number;
	sizeInBytes: number;
}

/**
 * Image
 */
export interface Image extends BaseEntity {
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		large?: ImageFormat;
		small?: ImageFormat;
		medium?: ImageFormat;
		thumbnail?: ImageFormat;
	};
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: any | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

/**
 * RichText
 */
export type RichText = {
	type: 'paragraph' | 'text';
	text?: string; // For "text" type
	children?: RichText[]; // For "paragraph" type
};

export interface AuthResponse {
	jwt: string;
	user: {
		id: number;
		username: string;
		email: string;
	};
}

export interface RegisterResponse {
	user: {
		id: number;
		username: string;
		email: string;
	};
}

export interface User {
	id: number;
	username: string;
	email: string;
}

export interface Cart {
	items: string[];
}

export type PayPalOrder = {
	id: string;
	status: string;
	links: {
		href: string;
		rel: string;
		method: string;
	}[];
};
