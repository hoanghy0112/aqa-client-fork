import { graphql } from "../../gql";

export const getCommentQuantityApi = graphql(`
	query CommentQuantity($type: String!) {
		commentQuantity(type: $type) {
			quantity
			type
		}
	}
`);
