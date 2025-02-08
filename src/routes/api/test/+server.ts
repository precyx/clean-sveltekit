import { json } from '@sveltejs/kit';

export async function GET() {
	console.log('🔍 GET request received at /api/my-endpoint');

	return json({ message: 'Test: API is working!' });
}
