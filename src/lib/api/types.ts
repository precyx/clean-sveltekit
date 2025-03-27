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

export type ServiceError = {
	message: string;
	data: {
		status: number;
		name: string;
		message: string;
		details?: Record<string, unknown>;
	} | null;
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
	user: User;
	loginToken: string;
}

export interface RegisterResponse {
	user: User;
	loginToken: string;
}

export interface ConfirmRegistrationResponse {
	message: string;
	email: string;
	confirmed: boolean;
}

export interface User {
	documentId: number;
	username: string;
	email: string;
	country: string;
	phone: string;
	confirmed: boolean;
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

export type EmailStore = {
	email: string;
	status: 'verified' | 'pending';
};

/**
 * Cart
 */

export interface Cart extends BaseEntity {
	user: User;
	courses: Course[];
}

/**
 * Order
 */

export interface Order extends BaseEntity {
	user: User;
	courses: Course[];
	total: number;
	orderId: string;
	paymentMethod: string;
	paymentStatus: string;
	totalPrice: number;
	prices: [
		{
			price: number;
			documentId: string;
		}
	];
	orderDate: string;
	orderStatus: string;
	orderHistory: string;
	//
	paymentDetails: PaymentDetails;
}

/**
 * Payment
 */

export interface PagoMovilBankInfo extends BaseEntity {
	amount: number;
	bank: string;
	phoneNumber: string;
	identityDocument: string;
	dailyExchangeRateVES: number;
	dailyExchangeRateVESUpdatedAt: Date;
	dailyExchangeRateVESUpdatedAtExternal: Date;
}

interface PaymentDetailsPaypal {
	type: 'paypal';
	orderId: string;
}
interface PaymentDetailsPagomovil {
	type: 'pagomovil';
	bankReference: string;
	senderPhone: string;
	amount?: number;
}

export type PaymentDetails = PaymentDetailsPaypal | PaymentDetailsPagomovil;
