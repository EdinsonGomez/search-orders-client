import { useState } from 'react';
import '../../styles/form/form.scss';

function Form(props) {
	const formConfig = props.config;
	const mode = props.mode ?? 'CREATE';
  const items = formConfig.content[mode.toLowerCase()]?.items ?? [];

  const [data, setData] = useState(() => {
    const initalData = {}; 
    
    items
      .filter((item) => item.type !== 'action')
      .forEach((item) => {
        initalData[item.key] = ""
      })

    return initalData;
  })

	const onSubmit = (e) => {
		e.preventDefault();
		
		if (props.onSubmit) props.onSubmit(data);
	}

  const onChangeData = (key, value) => {
    setData({...data, [key]: value })
  }

	const builders = {
			text: config => (
				<div className='form__form-control' key={config.key}>
					{config.label ? (
						<label className='form__form-label' htmlFor={config.key}>{config.label}</label>
					) : null}
					<input
						className='form__form-text'
            type='text'
            name={config.name}
            id={config.key}
            value={data[config.key]}
						placeholder={config.placeholder ?? ""}
            onChange={(e) => onChangeData(config.key, e.target.value)}
          />
				</div>
			),
			select: config => (
				<div className='form__form-control' key={config.key}>
					{config.label ? (
						<label className='form__form-label' htmlFor={config.key}>{config.label}</label>
					) : null}
					<select
						className='form__form-select'
            name={config.name}
            id={config.key}
            value={data[config.key]}
            onChange={(e) => onChangeData(config.key, e.target.value)}
          >
            <option value="">Tipo de documento</option>
						{config.options.length > 0
							? config.options.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
							)) : null}
					</select>
				</div>
			),
			view: config => (
				<div className='form__form-view' key={config.key}>
					<p>
						<strong>{config.label}: </strong>
						{config.value ?? ''}
					</p>
				</div>
			),
			action: (config) => (
				<div className="form__form-control">
					<button
						className='form__form-btn form__form-btn--outline'
						type='submit'
						key='form-btn'
						disabled={props.loading}
					>
						{config.text}
					</button>
				</div>
			),
		}

	const getContent = () => {
		const content = items.map(item =>
			item.type ? builders[item.type](item) : builders.view(item)
		);

		return content;
	}

	return (
		<div>
			<form className={`form ${formConfig.className ?? ''}`} onSubmit={onSubmit}>{getContent()}</form>
			{props.error ? (
				<div className='form__form-error'>
					<p>
						{props.error}
					</p>
				</div>
			) : null}
		</div>
	);
}

export default Form;
