using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HighStreetGym.Domain;
using HighStreetGym.Service.ActivityService.Dto;
using HighStreetGym.Service.RoomService.Dto;
using HighStreetGym.Service.UserService.Dto;
using HighStreetGym.Service.ClassService.Dto;
using HighStreetGym.Service.BookingService.Dto;
using HighStreetGym.Service.BlogPostService.Dto;

namespace HighStreetGym.Service
{
    public class HighStreetGymProfile : Profile
    {
        public HighStreetGymProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.user_id, opt => opt.MapFrom(src => src.user_id))
                .ForMember(dest => dest.user_email, opt => opt.MapFrom(src => src.user_email))
                .ForMember(dest => dest.user_password, opt => opt.MapFrom(src => src.user_password))
                .ForMember(dest => dest.user_access_role, opt => opt.MapFrom(src => src.user_access_role))
                .ForMember(dest => dest.user_phone, opt => opt.MapFrom(src => src.user_phone))
                .ForMember(dest => dest.user_first_name, opt => opt.MapFrom(src => src.user_first_name))
                .ForMember(dest => dest.user_last_name, opt => opt.MapFrom(src => src.user_last_name))
                .ForMember(dest => dest.user_address, opt => opt.MapFrom(src => src.user_address))
                .ReverseMap()
                .ForMember(dest => dest.BlogPosts, opt => opt.Ignore()) // Ignore BlogPosts
                .ForMember(dest => dest.Bookings, opt => opt.Ignore())   // Ignore Bookings
                .ForMember(dest => dest.Classes, opt => opt.Ignore());  // Ignore Classes;

            CreateMap<Domain.Room, RoomDto>()
                .ForMember(dest => dest.room_id, opt => opt.MapFrom(src => src.room_id))
                .ForMember(dest => dest.room_location, opt => opt.MapFrom(src => src.room_location))
                .ForMember(dest => dest.room_number, opt => opt.MapFrom(src => src.room_number))
                    .ReverseMap();

            CreateMap<Activity, ActivityDto>().ReverseMap();


            CreateMap<ClassDto, Class>()
            .ForMember(dest => dest.Activity, opt => opt.Ignore())
            .ForMember(dest => dest.Room, opt => opt.Ignore())
            .ForMember(dest => dest.BookingClasses, opt => opt.Ignore())
            .ForMember(dest => dest.User, opt => opt.Ignore());

            CreateMap<Class, ClassDto>();

            CreateMap<UpdateClassDto, Class>()
            .ForMember(dest => dest.Activity, opt => opt.Ignore())
            .ForMember(dest => dest.Room, opt => opt.Ignore())
            .ForMember(dest => dest.BookingClasses, opt => opt.Ignore())
            .ForMember(dest => dest.User, opt => opt.Ignore());

            CreateMap<Class, UpdateClassDto>();

            // UpdateBookingDto To Booking Mapping
            CreateMap<UpdateBookingDto, Booking>()
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.BookingClasses, opt => opt.Ignore());

            // Booking To UpdateBookingDto Mapping
            CreateMap<Booking, UpdateBookingDto>();

            CreateMap<UpdateBlogPostDto, BlogPost>()
                .ForMember(dest => dest.User, opt => opt.Ignore());

            CreateMap<BlogPost, UpdateBlogPostDto>();

        }

    }
}