// external
import React, { FormEvent, useState } from 'react';

// styles
import * as styles from './SingleInputForm.module.css';

export interface SingleInputFormProps {
	/**
	 * Type of the input field.
	 * @default string "text"
	 */
	inputType?: HTMLInputElement['type'];
	labelText: string;
	onSubmit: (formValue: string) => void;
	/**
	 * Custom submit button text
	 * @default string "Submit"
	 */
	submitText?: string;
}

export function SingleInputForm({
	inputType = 'text',
	labelText,
	onSubmit,
	submitText = 'Submit',
}: SingleInputFormProps) {
	const [value, setValue] = useState('');

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onSubmit(value);
		setValue('');
	};

	return (
		<form
			id='single-input-form'
			onSubmit={handleSubmit}
			className={styles.formStyles}
		>
			<label htmlFor='single-input'>{labelText}</label>
			<div>
				<input
					form='single-input-form'
					id='single-input'
					type={inputType}
					value={value}
					onChange={({ currentTarget }) => setValue(currentTarget.value)}
				/>
				<span>
					<button type='submit'>{submitText}</button>
				</span>
			</div>
		</form>
	);
}

export default SingleInputForm;
