import {render, screen} from '@testing-library/react';
import Search from './index';

test('renders the landing page', async () => {
   render(<Search />);

   expect(screen.getByRole("radio-text")).toHaveTextContent("Search For");
});
