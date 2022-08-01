import { NextResponse } from 'next/server';

export default function authorization(req) {
  const response = NextResponse.next();
  response.cookies.set('token', '12345');
  return response;
}
