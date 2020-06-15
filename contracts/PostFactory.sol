pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PostFactory is Ownable {

    struct Post {
        string name;
        string content;
        uint32 prev;
        uint32 next;
    }

    Post[] public posts;

    mapping (uint => address) public postToOwner;
    mapping (address => uint) ownerPostCount;

    function SurveyFactory() public {
        posts.push(Post("dummy", "dummy", 0, 0));

    }

    function createPost(uint32 _prev, string calldata _name, string calldata _content) external {
        uint32 id;
        if (_prev != 0) {
            posts.push(Post(_name, _content, _prev, 0));
            id = uint32(posts.length - 1);
        } else {
            posts.push(Post(_name, _content, 0, 0));
            id = uint32(posts.length - 1);
        }
        postToOwner[id] = msg.sender;
        ownerPostCount[msg.sender]++;
    }

    function getPosts() external view returns(Post[] memory){
        return posts;
    }

    function getOwnedPosts(address  _owner) external view returns(Post[] memory) {
        Post[] memory result = new Post[](ownerPostCount[_owner]);
        uint32 counter = 0;
        for (uint32 i = 0; i < posts.length; i++) {
            if (postToOwner[i] == _owner) {
                result[counter] = posts[i];
                counter++;
            }
        }
        return result;
    }

}