import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AgregarItem from './AgregarItem'; // Importa tu componente

test('Comportamiento de los campos y botones', async () => {
  const { getByText, getByLabelText } = render(<AgregarItem />);

  // Simula la entrada de datos
  fireEvent.change(getByLabelText('Nombre'), { target: { value: 'Producto de prueba' } });
  fireEvent.change(getByLabelText('Compra'), { target: { value: 10 } });
  fireEvent.change(getByLabelText('Venta'), { target: { value: 20 } });
  fireEvent.change(getByLabelText('Cantidad'), { target: { value: 5 } });

  // Verifica que los campos se hayan llenado correctamente
  expect(getByLabelText('Nombre')).toHaveValue('Producto de prueba');
  expect(getByLabelText('Compra')).toHaveValue(10);
  expect(getByLabelText('Venta')).toHaveValue(20);
  expect(getByLabelText('Cantidad')).toHaveValue(5);

  // Simula el clic en el botón Aceptar
  fireEvent.click(getByText('Aceptar'));

  // Espera a que se complete la solicitud Axios (puedes ajustar esto según tu lógica)
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('agregado');
  });
});
