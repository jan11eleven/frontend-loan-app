type GoogleAccountType = {
	id: number;
	google_id: string;
	user_id: number;
	display_name: string;
	given_name: string;
	family_name: string;
	email: string;
	photo: string;
	provider: string;
	created_on: Date;
	updated_on: Date;
};

export default GoogleAccountType;
