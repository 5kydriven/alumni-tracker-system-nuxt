export default function rearrangeName(name: string) {
	if (!name.includes(',')) return name;

	let parts = name.split(', ');
	if (parts.length > 1) {
		return parts[1] + ' ' + parts[0];
	}
	return name;
}
