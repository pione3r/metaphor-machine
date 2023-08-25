import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
	it('홈페이지 렌더링 테스트', () => {
		render(<Home />);

		const text = screen.getByText('안녕 세상');

		expect(text).toBeInTheDocument();
	});
});
