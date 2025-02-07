declare namespace paypal {
	interface Amount {
		currency_code: string;
		value: string;
	}

	interface PurchaseUnit {
		amount: Amount;
	}

	interface Payer {
		name?: {
			given_name: string;
			surname: string;
		};
		email_address?: string;
		payer_id?: string;
	}

	interface OrderData {
		id: string;
		status: string;
		payer?: Payer;
		purchase_units?: PurchaseUnit[];
	}

	interface ApproveData {
		orderID: string;
		payerID?: string;
		paymentID?: string;
	}

	interface Actions {
		order: {
			create: (data: { purchase_units: PurchaseUnit[] }) => Promise<string>;
			capture: () => Promise<OrderData>;
		};
	}

	interface ButtonsConfig {
		style?: {
			layout?: 'vertical' | 'horizontal';
			color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
			shape?: 'rect' | 'pill';
			label?: 'checkout' | 'pay' | 'buynow' | 'paypal';
			tagline?: boolean;
		};
		createOrder: (data: any, actions: Actions) => Promise<string>;
		onApprove: (data: ApproveData, actions: Actions) => Promise<void>;
		onError?: (error: any) => void;
	}

	interface Buttons {
		(config: ButtonsConfig): {
			render: (selector: string) => void;
		};
	}

	interface Orders {
		approve: (orderId: string) => Promise<OrderData>;
	}

	// The main PayPal SDK interface
	interface PaypalSDK {
		Buttons: Buttons;
		Orders: () => Orders;
	}
}

// Declare the global `paypal` object without nesting inside the namespace
declare const paypal: paypal.PaypalSDK;
