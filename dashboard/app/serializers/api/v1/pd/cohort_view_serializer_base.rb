class Api::V1::Pd::CohortViewSerializerBase < ActiveModel::Serializer
  attributes(
    :id,
    :date_accepted,
    :applicant_name,
    :district_name,
    :school_name,
    :email,
    :assigned_workshop,
    :registered_workshop,
    :accepted_teachercon,
    :status
  )

  # Dynamically add locked where applicable
  def attributes(attrs = {})
    super(attrs).tap do |data|
      data[:locked] = object.locked? if object.class.can_see_locked_status?(@scope[:user])
    end
  end

  def email
    object.user.email
  end

  def assigned_workshop
    object.workshop_date_and_location
  end

  def registered_workshop
    if object.workshop.try(:local_summer?)
      object.registered_workshop? ? 'Yes' : 'No'
    end
  end

  def accepted_teachercon
    if object.workshop.try(:teachercon?)
      object.pd_teachercon1819_registration ? 'Yes' : 'No'
    end
  end
end
