import { ProfileInfo } from "./ProfileInfo"
import { ProfilePicture } from "./ProfilePicture"

export const ProfileView = () => {
    return (
        <div className = "container-md pb-2">
            <div className="row gutters-sm">
                <div className="col-md-4">
                    <ProfilePicture />
                </div>
                <div className="col-md-8">
                    <ProfileInfo />
                </div>
            </div>
        </div>
    )
}