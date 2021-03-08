import { v4 as uuidv4 } from 'uuid';

/**
 * Returns mutated object, where all nested objects have a unique id
 * @param {data} data - An object with nested objects
 */
export const extendWithIds = (data) =>
	Object.fromEntries(
		Object.entries(data).map(([key, value]) => [
			key,
			{
				...value,
				id: uuidv4(),
			},
		])
	);
